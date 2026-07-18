import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobStatus } from '@huntkit/shared';
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

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateJobDto) {
    const job = await this.prisma.jobs.create({
      data: {
        user_id: userId,
        company: dto.company,
        role_title: dto.roleTitle,
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

    const job = await this.prisma.jobs.update({
      where: { id },
      data: {
        company: dto.company,
        role_title: dto.roleTitle,
        jd_text: dto.jdText,
        job_url: dto.jobUrl,
        location: dto.location,
        notes: dto.notes,
        status: dto.status,
        applied_at: dto.status === JobStatus.APPLIED ? new Date() : undefined,
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
    overall_match_score: number | null;
    created_at: Date;
  }) {
    return {
      analysisId: a.id,
      runId: a.ai_run_id,
      requirementSummary: a.requirement_summary ?? '',
      strengths: a.strengths ?? [],
      gaps: a.gaps ?? [],
      applicationBullets: a.application_bullets ?? [],
      interviewQuestions: a.interview_questions ?? [],
      citations: a.citations ?? [],
      overallMatchScore: a.overall_match_score ?? 0,
      createdAt: a.created_at,
    };
  }
}
