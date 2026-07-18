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
exports.ProfileIngestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const openai_embedding_service_1 = require("./openai-embedding.service");
const chunk_text_1 = require("./utils/chunk-text");
let ProfileIngestService = class ProfileIngestService {
    prisma;
    embedding;
    constructor(prisma, embedding) {
        this.prisma = prisma;
        this.embedding = embedding;
    }
    async createSource(userId, dto) {
        const source = await this.prisma.profile_sources.create({
            data: {
                user_id: userId,
                source_type: dto.sourceType,
                title: dto.title,
                content: dto.content,
                status: 'processing',
            },
        });
        await this.indexSource(userId, source.id, dto.content);
        return this.getSource(userId, source.id);
    }
    async reindex(userId, sourceId) {
        const source = await this.prisma.profile_sources.findFirst({
            where: { id: sourceId, user_id: userId },
        });
        if (!source)
            throw new common_1.NotFoundException('Source not found');
        await this.prisma.profile_chunks.deleteMany({
            where: { profile_source_id: sourceId, user_id: userId },
        });
        await this.prisma.profile_sources.update({
            where: { id: sourceId },
            data: { status: 'processing', chunk_count: 0, error_message: null },
        });
        await this.indexSource(userId, sourceId, source.content);
        return this.getSource(userId, sourceId);
    }
    async indexSource(userId, sourceId, content) {
        try {
            const chunks = (0, chunk_text_1.chunkText)(content);
            const vectors = await this.embedding.embedBatch(chunks.map((c) => c.content));
            for (let i = 0; i < chunks.length; i++) {
                const vectorLiteral = `[${vectors[i].join(',')}]`;
                await this.prisma.$executeRaw `
          INSERT INTO profile_chunks
            (id, profile_source_id, user_id, chunk_index, content, embedding)
          VALUES (
            gen_random_uuid(),
            ${sourceId}::uuid,
            ${userId}::uuid,
            ${chunks[i].index},
            ${chunks[i].content},
            ${vectorLiteral}::vector
          )
        `;
            }
            await this.prisma.profile_sources.update({
                where: { id: sourceId },
                data: {
                    status: 'ready',
                    chunk_count: chunks.length,
                    error_message: null,
                    updated_at: new Date(),
                },
            });
        }
        catch (err) {
            await this.prisma.profile_sources.update({
                where: { id: sourceId },
                data: {
                    status: 'failed',
                    error_message: String(err),
                    updated_at: new Date(),
                },
            });
            throw err;
        }
    }
    async listSources(userId) {
        const items = await this.prisma.profile_sources.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
        });
        return { items: items.map((s) => this.toPublic(s)) };
    }
    async getSource(userId, id) {
        const source = await this.prisma.profile_sources.findFirst({
            where: { id, user_id: userId },
        });
        if (!source)
            throw new common_1.NotFoundException('Source not found');
        return { source: this.toPublic(source) };
    }
    async deleteSource(userId, id) {
        const found = await this.prisma.profile_sources.findFirst({
            where: { id, user_id: userId },
            select: { id: true },
        });
        if (!found)
            throw new common_1.NotFoundException('Source not found');
        await this.prisma.profile_sources.delete({ where: { id } });
        return { success: true };
    }
    toPublic(s) {
        return {
            id: s.id,
            sourceType: s.source_type,
            title: s.title,
            status: s.status,
            chunkCount: s.chunk_count,
            errorMessage: s.error_message,
            createdAt: s.created_at,
            updatedAt: s.updated_at,
        };
    }
};
exports.ProfileIngestService = ProfileIngestService;
exports.ProfileIngestService = ProfileIngestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        openai_embedding_service_1.OpenAiEmbeddingService])
], ProfileIngestService);
//# sourceMappingURL=profile-ingest.service.js.map