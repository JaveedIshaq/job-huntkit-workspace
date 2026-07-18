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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const MAX_LIMIT = 100;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listAiRuns(userId, limit = 50, offset = 0) {
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
    async getAiRun(userId, id) {
        const run = await this.prisma.ai_runs.findFirst({
            where: { id, user_id: userId },
        });
        if (!run)
            throw new common_1.NotFoundException('AI run not found');
        return { run: this.toPublicRun(run) };
    }
    async getStats(userId) {
        const weekAgo = new Date(Date.now() - WEEK_MS);
        const [jobsTotal, appliedCount, analysesCount, tokenAgg] = await Promise.all([
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
    toPublicRun(run) {
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map