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
exports.AnalyzeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const profile_retrieval_service_1 = require("../profile/profile-retrieval.service");
const openai_chat_service_1 = require("./openai-chat.service");
const analyze_constants_1 = require("./analyze.constants");
const JD_EMBED_MAX_CHARS = 2000;
const CHAT_MODEL = 'gpt-4o-mini';
let AnalyzeService = class AnalyzeService {
    prisma;
    retrieval;
    chat;
    constructor(prisma, retrieval, chat) {
        this.prisma = prisma;
        this.retrieval = retrieval;
        this.chat = chat;
    }
    async analyzeJob(userId, jobId) {
        const job = await this.prisma.jobs.findFirst({
            where: { id: jobId, user_id: userId },
        });
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        const threshold = Number(process.env.RAG_SCORE_THRESHOLD ?? 0.3);
        const query = job.jd_text.slice(0, JD_EMBED_MAX_CHARS);
        const { results } = await this.retrieval.search(userId, query, 8);
        const bestScore = results[0]?.score ?? 0;
        const chunkIds = results.map((r) => r.id);
        if (results.length === 0) {
            const run = await this.prisma.ai_runs.create({
                data: {
                    user_id: userId,
                    run_type: 'job_analyze',
                    model: CHAT_MODEL,
                    status: 'low_context',
                    error_message: 'No profile chunks found. Ingest profile sources first.',
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
        const context = results
            .map((c) => `[chunkId: ${c.id}] (source: ${c.source_title}, score: ${c.score.toFixed(3)})\n${c.content}`)
            .join('\n\n---\n\n');
        const userPrompt = `JOB DESCRIPTION:\n${job.jd_text}\n\nPROFILE CONTEXT (the only facts you may use):\n${context}`;
        const startedAt = Date.now();
        let parsed;
        let chatModel = CHAT_MODEL;
        let usage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };
        try {
            const result = await this.chat.completeJson(analyze_constants_1.ANALYZE_SYSTEM_PROMPT, userPrompt);
            chatModel = result.model;
            usage = result.usage;
            parsed = this.parseAnalysis(result.content);
        }
        catch (err) {
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
    parseAnalysis(raw) {
        let obj;
        try {
            obj = JSON.parse(raw);
        }
        catch {
            throw new common_1.InternalServerErrorException('Model did not return valid JSON');
        }
        return {
            requirementSummary: typeof obj.requirementSummary === 'string'
                ? obj.requirementSummary
                : '',
            strengths: Array.isArray(obj.strengths)
                ? obj.strengths
                : [],
            gaps: Array.isArray(obj.gaps) ? obj.gaps : [],
            applicationBullets: Array.isArray(obj.applicationBullets)
                ? obj.applicationBullets
                : [],
            interviewQuestions: Array.isArray(obj.interviewQuestions)
                ? obj.interviewQuestions
                : [],
            overallMatchScore: typeof obj.overallMatchScore === 'number' ? obj.overallMatchScore : 0,
        };
    }
    clampScore(n) {
        if (!Number.isFinite(n))
            return 0;
        return Math.max(0, Math.min(100, Math.round(n)));
    }
};
exports.AnalyzeService = AnalyzeService;
exports.AnalyzeService = AnalyzeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        profile_retrieval_service_1.ProfileRetrievalService,
        openai_chat_service_1.OpenAiChatService])
], AnalyzeService);
//# sourceMappingURL=analyze.service.js.map