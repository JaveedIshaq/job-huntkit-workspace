import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ProfileRetrievalService } from '../profile/profile-retrieval.service';
import { OpenAiChatService } from './openai-chat.service';
import {
  ANALYZE_SYSTEM_PROMPT,
  CANDIDATE_CONSTRAINTS,
} from './analyze.constants';

export type EligibilityVerdict = 'apply' | 'apply_low_priority' | 'skip';
export type EligibilityConfidence = 'high' | 'medium' | 'low';
export type RemoteScope =
  | 'worldwide'
  | 'country_or_region_only'
  | 'onsite_or_hybrid'
  | 'unclear';
export type EmploymentType =
  | 'contractor_b2b'
  | 'local_payroll'
  | 'staffing_agency'
  | 'unclear';
export type RiskLevel = 'low' | 'medium' | 'high' | 'unclear';
export type PayVsFloor = 'above' | 'near' | 'below' | 'unclear';

export type Eligibility = {
  verdict: EligibilityVerdict;
  confidence: EligibilityConfidence;
  remoteScope: RemoteScope;
  employmentType: EmploymentType;
  workAuthRisk: RiskLevel;
  languageRisk: RiskLevel;
  payVsFloor: PayVsFloor;
  roleFitNote: string;
  reasons: string[];
  summary: string;
};

type ParsedAnalysis = {
  requirementSummary: string;
  strengths: { text: string; chunkId?: string }[];
  gaps: { text: string; suggestion?: string }[];
  applicationBullets: {
    text: string;
    chunkIds?: string[];
    confidence?: 'high' | 'medium';
  }[];
  interviewQuestions: {
    question: string;
    whyLikely?: string;
    prepHint?: string;
  }[];
  overallMatchScore: number;
  eligibility: Eligibility;
};

const JD_EMBED_MAX_CHARS = 2000;
const CHAT_MODEL = 'gpt-4o-mini';

const DEFAULT_ELIGIBILITY: Eligibility = {
  verdict: 'skip',
  confidence: 'low',
  remoteScope: 'unclear',
  employmentType: 'unclear',
  workAuthRisk: 'unclear',
  languageRisk: 'unclear',
  payVsFloor: 'unclear',
  roleFitNote: '',
  reasons: ['Could not assess eligibility from the model response.'],
  summary:
    'Eligibility unclear — re-analyze or verify remote/worldwide hiring manually.',
};

@Injectable()
export class AnalyzeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly retrieval: ProfileRetrievalService,
    private readonly chat: OpenAiChatService,
  ) {}

  async analyzeJob(userId: string, jobId: string) {
    const job = await this.prisma.jobs.findFirst({
      where: { id: jobId, user_id: userId },
    });
    if (!job) throw new NotFoundException('Job not found');

    const threshold = Number(process.env.RAG_SCORE_THRESHOLD ?? 0.3);

    // 1. Retrieve profile context by embedding the JD (truncated for cost).
    const query = job.jd_text.slice(0, JD_EMBED_MAX_CHARS);
    const { results } = await this.retrieval.search(userId, query, 8);
    const bestScore = results[0]?.score ?? 0;
    const chunkIds = results.map((r) => r.id);

    // 2. No profile context at all → record low_context and stop early.
    if (results.length === 0) {
      const run = await this.prisma.ai_runs.create({
        data: {
          user_id: userId,
          run_type: 'job_analyze',
          model: CHAT_MODEL,
          status: 'low_context',
          error_message:
            'No profile chunks found. Ingest profile sources first.',
          retrieved_chunk_ids: [],
          input_preview: query.slice(0, 500),
        },
      });
      return {
        analysisId: null,
        runId: run.id,
        status: 'low_context',
        message: 'No profile context found. Add profile sources, then analyze.',
      };
    }

    // 3. Build the grounded context block the model is allowed to use.
    const context = results
      .map(
        (c) =>
          `[chunkId: ${c.id}] (source: ${c.source_title}, score: ${c.score.toFixed(3)})\n${c.content}`,
      )
      .join('\n\n---\n\n');

    const metaLines = [
      job.location ? `Job location field: ${job.location}` : null,
      job.job_url ? `Job URL field: ${job.job_url}` : null,
      `Company field: ${job.company}`,
      `Role title field: ${job.role_title}`,
    ]
      .filter(Boolean)
      .join('\n');

    const userPrompt = `${CANDIDATE_CONSTRAINTS}

JOB METADATA (from saved job record):
${metaLines}

JOB DESCRIPTION:
${job.jd_text}

PROFILE CONTEXT (the only facts you may use for strengths/gaps/bullets/questions):
${context}`;

    // 4. Call the LLM; on failure, log a failed run and rethrow.
    const startedAt = Date.now();
    let parsed: ParsedAnalysis;
    let chatModel = CHAT_MODEL;
    let usage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };

    try {
      const result = await this.chat.completeJson(
        ANALYZE_SYSTEM_PROMPT,
        userPrompt,
      );
      chatModel = result.model;
      usage = result.usage;
      parsed = this.parseAnalysis(result.content);
    } catch (err) {
      await this.prisma.ai_runs.create({
        data: {
          user_id: userId,
          run_type: 'job_analyze',
          model: chatModel,
          status: 'failed',
          error_message: String(err),
          retrieved_chunk_ids: chunkIds,
          latency_ms: Date.now() - startedAt,
          input_preview: query.slice(0, 500),
        },
      });
      throw err;
    }

    const latencyMs = Date.now() - startedAt;
    const status = bestScore < threshold ? 'low_context' : 'success';

    const citations = results.map((c) => ({
      chunkId: c.id,
      sourceTitle: c.source_title,
      excerpt: c.content.slice(0, 300),
      score: Number(c.score.toFixed(4)),
    }));

    const overallMatchScore = this.clampScore(parsed.overallMatchScore);

    // 5. Persist the run, then the analysis referencing it.
    const run = await this.prisma.ai_runs.create({
      data: {
        user_id: userId,
        run_type: 'job_analyze',
        model: chatModel,
        prompt_tokens: usage.promptTokens,
        completion_tokens: usage.completionTokens,
        total_tokens: usage.totalTokens,
        latency_ms: latencyMs,
        status,
        retrieved_chunk_ids: chunkIds,
        input_preview: query.slice(0, 500),
        output_preview: JSON.stringify(parsed).slice(0, 500),
        metadata: {
          bestScore,
          threshold,
          eligibilityVerdict: parsed.eligibility.verdict,
        },
      },
    });

    const analysis = await this.prisma.job_analyses.create({
      data: {
        job_id: jobId,
        user_id: userId,
        ai_run_id: run.id,
        requirement_summary: parsed.requirementSummary,
        strengths: parsed.strengths,
        gaps: parsed.gaps,
        application_bullets: parsed.applicationBullets,
        interview_questions: parsed.interviewQuestions,
        citations,
        eligibility: parsed.eligibility as unknown as Prisma.InputJsonValue,
        overall_match_score: overallMatchScore,
      },
    });

    return {
      analysisId: analysis.id,
      runId: run.id,
      status,
      bestScore: Number(bestScore.toFixed(4)),
      requirementSummary: parsed.requirementSummary,
      strengths: parsed.strengths,
      gaps: parsed.gaps,
      applicationBullets: parsed.applicationBullets,
      interviewQuestions: parsed.interviewQuestions,
      citations,
      eligibility: parsed.eligibility,
      overallMatchScore,
      usage,
      latencyMs,
    };
  }

  private parseAnalysis(raw: string): ParsedAnalysis {
    let obj: Record<string, unknown>;
    try {
      obj = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      throw new InternalServerErrorException('Model did not return valid JSON');
    }

    return {
      requirementSummary:
        typeof obj.requirementSummary === 'string'
          ? obj.requirementSummary
          : '',
      strengths: Array.isArray(obj.strengths)
        ? (obj.strengths as ParsedAnalysis['strengths'])
        : [],
      gaps: Array.isArray(obj.gaps) ? (obj.gaps as ParsedAnalysis['gaps']) : [],
      applicationBullets: Array.isArray(obj.applicationBullets)
        ? (obj.applicationBullets as ParsedAnalysis['applicationBullets'])
        : [],
      interviewQuestions: Array.isArray(obj.interviewQuestions)
        ? (obj.interviewQuestions as ParsedAnalysis['interviewQuestions'])
        : [],
      overallMatchScore:
        typeof obj.overallMatchScore === 'number' ? obj.overallMatchScore : 0,
      eligibility: this.parseEligibility(obj.eligibility),
    };
  }

  private parseEligibility(raw: unknown): Eligibility {
    if (!raw || typeof raw !== 'object') return { ...DEFAULT_ELIGIBILITY };

    const e = raw as Record<string, unknown>;
    const verdict = this.oneOf(e.verdict, [
      'apply',
      'apply_low_priority',
      'skip',
    ] as const);
    const confidence = this.oneOf(e.confidence, [
      'high',
      'medium',
      'low',
    ] as const);
    const remoteScope = this.oneOf(e.remoteScope, [
      'worldwide',
      'country_or_region_only',
      'onsite_or_hybrid',
      'unclear',
    ] as const);
    const employmentType = this.oneOf(e.employmentType, [
      'contractor_b2b',
      'local_payroll',
      'staffing_agency',
      'unclear',
    ] as const);
    const workAuthRisk = this.oneOf(e.workAuthRisk, [
      'low',
      'medium',
      'high',
      'unclear',
    ] as const);
    const languageRisk = this.oneOf(e.languageRisk, [
      'low',
      'medium',
      'high',
      'unclear',
    ] as const);
    const payVsFloor = this.oneOf(e.payVsFloor, [
      'above',
      'near',
      'below',
      'unclear',
    ] as const);

    const reasons = Array.isArray(e.reasons)
      ? e.reasons.filter((r): r is string => typeof r === 'string').slice(0, 8)
      : DEFAULT_ELIGIBILITY.reasons;

    return {
      verdict: verdict ?? DEFAULT_ELIGIBILITY.verdict,
      confidence: confidence ?? DEFAULT_ELIGIBILITY.confidence,
      remoteScope: remoteScope ?? DEFAULT_ELIGIBILITY.remoteScope,
      employmentType: employmentType ?? DEFAULT_ELIGIBILITY.employmentType,
      workAuthRisk: workAuthRisk ?? DEFAULT_ELIGIBILITY.workAuthRisk,
      languageRisk: languageRisk ?? DEFAULT_ELIGIBILITY.languageRisk,
      payVsFloor: payVsFloor ?? DEFAULT_ELIGIBILITY.payVsFloor,
      roleFitNote:
        typeof e.roleFitNote === 'string'
          ? e.roleFitNote
          : DEFAULT_ELIGIBILITY.roleFitNote,
      reasons: reasons.length ? reasons : DEFAULT_ELIGIBILITY.reasons,
      summary:
        typeof e.summary === 'string' && e.summary.trim()
          ? e.summary.trim()
          : DEFAULT_ELIGIBILITY.summary,
    };
  }

  private oneOf<T extends string>(
    value: unknown,
    allowed: readonly T[],
  ): T | undefined {
    return typeof value === 'string' && (allowed as readonly string[]).includes(value)
      ? (value as T)
      : undefined;
  }

  private clampScore(n: number): number {
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
  }
}
