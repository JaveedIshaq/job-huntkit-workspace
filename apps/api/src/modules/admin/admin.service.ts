import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type AiRunRow = {
  id: string;
  run_type: string;
  model: string;
  prompt_tokens: number | null;
  completion_tokens: number | null;
  total_tokens: number | null;
  latency_ms: number | null;
  status: string;
  error_message: string | null;
  input_preview: string | null;
  output_preview: string | null;
  retrieved_chunk_ids: string[];
  metadata: unknown;
  created_at: Date;
};

const MAX_LIMIT = 100;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async listAiRuns(userId: string, limit = 50, offset = 0) {
    const take = Math.min(Math.max(limit, 1), MAX_LIMIT);
    const skip = Math.max(offset, 0);

    const [items, total] = await Promise.all([
      this.prisma.ai_runs.findMany({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' },
        take,
        skip,
      }),
      this.prisma.ai_runs.count({ where: { user_id: userId } }),
    ]);

    return {
      items: items.map((run) => this.toPublicRun(run)),
      total,
      limit: take,
      offset: skip,
    };
  }

  async getAiRun(userId: string, id: string) {
    const run = await this.prisma.ai_runs.findFirst({
      where: { id, user_id: userId },
    });
    if (!run) throw new NotFoundException('AI run not found');
    return { run: this.toPublicRun(run) };
  }

  async getStats(userId: string) {
    const weekAgo = new Date(Date.now() - WEEK_MS);

    const [jobsTotal, appliedCount, analysesCount, tokenAgg] =
      await Promise.all([
        this.prisma.jobs.count({ where: { user_id: userId } }),
        this.prisma.jobs.count({
          where: { user_id: userId, applied_at: { not: null } },
        }),
        this.prisma.job_analyses.count({ where: { user_id: userId } }),
        this.prisma.ai_runs.aggregate({
          where: { user_id: userId, created_at: { gte: weekAgo } },
          _sum: { total_tokens: true },
        }),
      ]);

    return {
      jobsTotal,
      appliedCount,
      analysesCount,
      tokensThisWeek: tokenAgg._sum.total_tokens ?? 0,
    };
  }

  private toPublicRun(run: AiRunRow) {
    return {
      id: run.id,
      runType: run.run_type,
      model: run.model,
      promptTokens: run.prompt_tokens,
      completionTokens: run.completion_tokens,
      totalTokens: run.total_tokens,
      latencyMs: run.latency_ms,
      status: run.status,
      errorMessage: run.error_message,
      inputPreview: run.input_preview,
      outputPreview: run.output_preview,
      retrievedChunkIds: run.retrieved_chunk_ids,
      metadata: run.metadata,
      createdAt: run.created_at,
    };
  }
}
