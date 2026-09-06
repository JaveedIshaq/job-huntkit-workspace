"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const openai_chat_service_1 = require("../analyze/openai-chat.service");
const parse_job_page_constants_1 = require("./parse-job-page.constants");
const shared_1 = require("@huntkit/shared");
const PAGE_TEXT_MAX = 60_000;
let JobsService = class JobsService {
    prisma;
    chat;
    constructor(prisma, chat) {
        this.prisma = prisma;
        this.chat = chat;
    }
    async parsePage(userId, dto) {
        const pageText = dto.pageText.trim().slice(0, PAGE_TEXT_MAX);
        if (pageText.length < 40) {
            throw new common_1.BadRequestException('Paste looks too short. Copy the full job page (Ctrl+A / Ctrl+C).');
        }
        const startedAt = Date.now();
        let model = 'gpt-4o-mini';
        let usage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };
        try {
            const result = await this.chat.completeJson(parse_job_page_constants_1.PARSE_JOB_PAGE_SYSTEM_PROMPT, `PASTED JOB PAGE TEXT:\n${pageText}`);
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
        }
        catch (err) {
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
            if (err instanceof common_1.BadRequestException ||
                err instanceof common_1.InternalServerErrorException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException(`Failed to extract job fields: ${String(err)}`);
        }
    }
    parseExtractedFields(raw) {
        let parsed;
        try {
            parsed = JSON.parse(raw);
        }
        catch {
            throw new common_1.InternalServerErrorException('Model returned invalid JSON');
        }
        const company = String(parsed.company ?? '').trim();
        const roleTitle = String(parsed.roleTitle ?? '').trim();
        const jdText = String(parsed.jdText ?? '').trim();
        const locationRaw = parsed.location;
        const location = locationRaw == null || String(locationRaw).trim() === ''
            ? null
            : String(locationRaw).trim();
        const urlRaw = parsed.jobUrl;
        const jobUrl = typeof urlRaw === 'string' && /^https?:\/\//i.test(urlRaw.trim())
            ? urlRaw.trim()
            : null;
        if (!jdText) {
            throw new common_1.BadRequestException('Could not extract a job description from that paste. Try copying the page again.');
        }
        return { company, roleTitle, location, jobUrl, jdText };
    }
    async create(userId, dto) {
        const job = await this.prisma.jobs.create({
            data: {
                user_id: userId,
                company: dto.company,
                role_title: dto.roleTitle,
                jd_text: dto.jdText,
                job_url: dto.jobUrl ?? null,
                location: dto.location ?? null,
                notes: dto.notes ?? null,
                status: dto.status ?? shared_1.JobStatus.SAVED,
            },
        });
        return { job: this.toPublic(job) };
    }
    async findAll(userId, status) {
        const where = {
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
        const countsByStatus = {};
        for (const row of grouped) {
            countsByStatus[row.status] = row._count._all;
        }
        return {
            items: items.map((job) => this.toPublic(job)),
            countsByStatus,
        };
    }
    async findOne(userId, id) {
        const job = await this.prisma.jobs.findFirst({
            where: { id, user_id: userId },
            include: {
                job_analyses: {
                    orderBy: { created_at: 'desc' },
                    take: 1,
                },
            },
        });
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        const { job_analyses, ...rest } = job;
        return {
            job: this.toPublic(rest),
            latestAnalysis: job_analyses[0]
                ? this.toPublicAnalysis(job_analyses[0])
                : null,
        };
    }
    async update(userId, id, dto) {
        await this.ensureOwned(userId, id);
        const job = await this.prisma.jobs.update({
            where: { id },
            data: {
                ...(dto.company !== undefined ? { company: dto.company } : {}),
                ...(dto.roleTitle !== undefined ? { role_title: dto.roleTitle } : {}),
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
                applied_at: dto.status === shared_1.JobStatus.APPLIED ? new Date() : undefined,
                updated_at: new Date(),
            },
        });
        return { job: this.toPublic(job) };
    }
    async remove(userId, id) {
        await this.ensureOwned(userId, id);
        await this.prisma.jobs.delete({ where: { id } });
        return { success: true };
    }
    async ensureOwned(userId, id) {
        const found = await this.prisma.jobs.findFirst({
            where: { id, user_id: userId },
            select: { id: true },
        });
        if (!found)
            throw new common_1.NotFoundException('Job not found');
    }
    toPublic(job) {
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
    toPublicAnalysis(a) {
        const eligibility = a.eligibility &&
            typeof a.eligibility === 'object' &&
            !Array.isArray(a.eligibility) &&
            Object.keys(a.eligibility).length > 0
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
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        openai_chat_service_1.OpenAiChatService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map