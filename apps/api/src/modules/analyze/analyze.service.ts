import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProfileRetrievalService } from '../profile/profile-retrieval.service';
import { OpenAiChatService } from './openai-chat.service';
import { ANALYZE_SYSTEM_PROMPT } from './analyze.constants';

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
};

const JD_EMBED_MAX_CHARS = 2000;
const CHAT_MODEL = 'gpt-4o-mini';

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

    const userPrompt = `JOB DESCRIPTION:\n${job.jd_text}\n\nPROFILE CONTEXT (the only facts you may use):\n${context}`;

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
        metadata: { bestScore, threshold },
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
    };
  }

  private clampScore(n: number): number {
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
  }
}
