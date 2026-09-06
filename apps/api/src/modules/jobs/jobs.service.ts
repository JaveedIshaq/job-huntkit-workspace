import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiChatService } from '../analyze/openai-chat.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ParseJobPageDto } from './dto/parse-job-page.dto';
import { PARSE_JOB_PAGE_SYSTEM_PROMPT } from './parse-job-page.constants';
import { JobStatus, composeRoleAtCompany, rewriteRoleCompany } from '@huntkit/shared';

type PublicJobSource = {
  id: string;
  company: string;
  role_title: string;
  job_url: string | null;
  location: string | null;
  status: string;
  jd_text: string;
  notes: string | null;
  applied_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type ParsedJobPage = {
  company: string;
  roleTitle: string;
  location: string | null;
  jobUrl: string | null;
  jdText: string;
};

const PAGE_TEXT_MAX = 60_000;

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chat: OpenAiChatService,
  ) {}

  async parsePage(userId: string, dto: ParseJobPageDto) {
    const pageText = dto.pageText.trim().slice(0, PAGE_TEXT_MAX);
    if (pageText.length < 40) {
      throw new BadRequestException(
        'Paste looks too short. Copy the full job page (Ctrl+A / Ctrl+C).',
      );
    }

    const startedAt = Date.now();
    let model = 'gpt-4o-mini';
    let usage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };

    try {
      const result = await this.chat.completeJson(
        PARSE_JOB_PAGE_SYSTEM_PROMPT,
        `PASTED JOB PAGE TEXT:\n${pageText}`,
      );
      model = result.model;
      usage = result.usage;
      const fields = this.parseExtractedFields(result.content);

      await this.prisma.ai_runs.create({
        data: {
          user_id: userId,
          run_type: 'job_analyze',
          model,
          prompt_tokens: usage.promptTokens,
          completion_tokens: usage.completionTokens,
          total_tokens: usage.totalTokens,
          latency_ms: Date.now() - startedAt,
          status: 'success',
          input_preview: pageText.slice(0, 500),
          output_preview: JSON.stringify(fields).slice(0, 500),
          retrieved_chunk_ids: [],
          metadata: { kind: 'parse_job_page' },
        },
      });

      return { fields };
    } catch (err) {
      await this.prisma.ai_runs.create({
        data: {
          user_id: userId,
          run_type: 'job_analyze',
          model,
          prompt_tokens: usage.promptTokens,
          completion_tokens: usage.completionTokens,
          total_tokens: usage.totalTokens,
          latency_ms: Date.now() - startedAt,
          status: 'failed',
          error_message: String(err),
          input_preview: pageText.slice(0, 500),
          retrieved_chunk_ids: [],
          metadata: { kind: 'parse_job_page' },
        },
      });
      if (
        err instanceof BadRequestException ||
        err instanceof InternalServerErrorException
      ) {
        throw err;
      }
      throw new InternalServerErrorException(
        `Failed to extract job fields: ${String(err)}`,
      );
    }
  }

  private parseExtractedFields(raw: string): ParsedJobPage {
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      throw new InternalServerErrorException('Model returned invalid JSON');
    }

    const company = String(parsed.company ?? '').trim();
    const roleTitle = String(parsed.roleTitle ?? '').trim();
    const jdText = String(parsed.jdText ?? '').trim();
    const locationRaw = parsed.location;
    const location =
      locationRaw == null || String(locationRaw).trim() === ''
        ? null
        : String(locationRaw).trim();
    const urlRaw = parsed.jobUrl;
    const jobUrl =
      typeof urlRaw === 'string' && /^https?:\/\//i.test(urlRaw.trim())
        ? urlRaw.trim()
        : null;

    if (!jdText) {
      throw new BadRequestException(
        'Could not extract a job description from that paste. Try copying the page again.',
      );
    }

    return {
      company,
      roleTitle: composeRoleAtCompany(roleTitle, company),
      location,
      jobUrl,
      jdText,
    };
  }

  async create(userId: string, dto: CreateJobDto) {
    const company = dto.company.trim();
    const roleTitle = composeRoleAtCompany(dto.roleTitle, company);
    const job = await this.prisma.jobs.create({
      data: {
        user_id: userId,
        company,
        role_title: roleTitle,
        jd_text: dto.jdText,
        job_url: dto.jobUrl ?? null,
        location: dto.location ?? null,
        notes: dto.notes ?? null,
        status: dto.status ?? JobStatus.SAVED,
      },
    });
    return { job: this.toPublic(job) };
  }

  async findAll(userId: string, status?: string) {
    const where: { user_id: string; status?: string } = {
      user_id: userId,
      ...(status ? { status } : {}),
    };

    const items = await this.prisma.jobs.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    const grouped = await this.prisma.jobs.groupBy({
      by: ['status'],
      where: { user_id: userId },
      _count: { _all: true },
    });

    const countsByStatus: Record<string, number> = {};
    for (const row of grouped) {
      countsByStatus[row.status] = row._count._all;
    }

    return {
      items: items.map((job) => this.toPublic(job)),
      countsByStatus,
    };
  }

  async findOne(userId: string, id: string) {
    const job = await this.prisma.jobs.findFirst({
      where: { id, user_id: userId },
      include: {
        job_analyses: {
          orderBy: { created_at: 'desc' },
          take: 1,
        },
      },
    });

    if (!job) throw new NotFoundException('Job not found');

    const { job_analyses, ...rest } = job;
    return {
      job: this.toPublic(rest),
      latestAnalysis: job_analyses[0]
        ? this.toPublicAnalysis(job_analyses[0])
        : null,
    };
  }

  async update(userId: string, id: string, dto: UpdateJobDto) {
    await this.ensureOwned(userId, id);

    // Stamp applied_at when marking applied; clear it when returning to saved.
    // Other status moves (screening, interview, …) leave the applied date alone.
    let appliedAt: Date | null | undefined = undefined;
    if (dto.status === JobStatus.APPLIED) {
      appliedAt = new Date();
    } else if (dto.status === JobStatus.SAVED) {
      appliedAt = null;
    }

    const existing = await this.prisma.jobs.findFirst({
      where: { id, user_id: userId },
      select: { company: true, role_title: true },
    });
    if (!existing) throw new NotFoundException('Job not found');

    const nextCompany =
      dto.company !== undefined ? dto.company.trim() : existing.company;
    let nextRoleTitle: string | undefined;
    if (dto.roleTitle !== undefined) {
      nextRoleTitle = composeRoleAtCompany(dto.roleTitle.trim(), nextCompany);
    } else if (dto.company !== undefined) {
      nextRoleTitle = rewriteRoleCompany(
        existing.role_title,
        existing.company,
        nextCompany,
      );
    }

    const job = await this.prisma.jobs.update({
      where: { id },
      data: {
        ...(dto.company !== undefined ? { company: nextCompany } : {}),
        ...(nextRoleTitle !== undefined ? { role_title: nextRoleTitle } : {}),
        ...(dto.jdText !== undefined ? { jd_text: dto.jdText } : {}),
        ...(dto.jobUrl !== undefined
          ? { job_url: dto.jobUrl === '' ? null : dto.jobUrl }
          : {}),
        ...(dto.location !== undefined
          ? { location: dto.location === '' ? null : dto.location }
          : {}),
        ...(dto.notes !== undefined
          ? { notes: dto.notes === '' ? null : dto.notes }
          : {}),
        ...(dto.status !== undefined ? { status: dto.status } : {}),
        ...(appliedAt !== undefined ? { applied_at: appliedAt } : {}),
        updated_at: new Date(),
      },
    });

    return { job: this.toPublic(job) };
  }

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await this.prisma.jobs.delete({ where: { id } });
    return { success: true };
  }

  private async ensureOwned(userId: string, id: string) {
    const found = await this.prisma.jobs.findFirst({
      where: { id, user_id: userId },
      select: { id: true },
    });
    if (!found) throw new NotFoundException('Job not found');
  }

  private toPublic(job: PublicJobSource) {
    return {
      id: job.id,
      company: job.company,
      roleTitle: job.role_title,
      jobUrl: job.job_url,
      location: job.location,
      status: job.status,
      jdText: job.jd_text,
      notes: job.notes,
      appliedAt: job.applied_at,
      createdAt: job.created_at,
      updatedAt: job.updated_at,
    };
  }

  // Normalize a saved job_analyses row (snake_case + JSON columns) into the
  // same camelCase shape the analyze endpoint returns, so the web UI can
  // render a previously-saved result without re-running the model.
  private toPublicAnalysis(a: {
    id: string;
    ai_run_id: string | null;
    requirement_summary: string | null;
    strengths: unknown;
    gaps: unknown;
    application_bullets: unknown;
    interview_questions: unknown;
    citations: unknown;
    eligibility: unknown;
    overall_match_score: number | null;
    created_at: Date;
  }) {
    const eligibility =
      a.eligibility &&
      typeof a.eligibility === 'object' &&
      !Array.isArray(a.eligibility) &&
      Object.keys(a.eligibility as object).length > 0
        ? a.eligibility
        : undefined;

    return {
      analysisId: a.id,
      runId: a.ai_run_id,
      requirementSummary: a.requirement_summary ?? '',
      strengths: a.strengths ?? [],
      gaps: a.gaps ?? [],
      applicationBullets: a.application_bullets ?? [],
      interviewQuestions: a.interview_questions ?? [],
      citations: a.citations ?? [],
      ...(eligibility ? { eligibility } : {}),
      overallMatchScore: a.overall_match_score ?? 0,
      createdAt: a.created_at,
    };
  }
}
