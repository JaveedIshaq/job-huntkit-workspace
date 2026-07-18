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
exports.ProfileRetrievalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const openai_embedding_service_1 = require("./openai-embedding.service");
let ProfileRetrievalService = class ProfileRetrievalService {
    prisma;
    embedding;
    constructor(prisma, embedding) {
        this.prisma = prisma;
        this.embedding = embedding;
    }
    async search(userId, query, limit = 8) {
        const [vector] = await this.embedding.embedBatch([query]);
        const vectorLiteral = `[${vector.join(',')}]`;
        const results = await this.prisma.$queryRaw `
      SELECT c.id, c.content, ps.title AS source_title,
             1 - (c.embedding <=> ${vectorLiteral}::vector) AS score
      FROM profile_chunks c
      JOIN profile_sources ps ON ps.id = c.profile_source_id
      WHERE c.user_id = ${userId}::uuid AND ps.status = 'ready'
      ORDER BY c.embedding <=> ${vectorLiteral}::vector
      LIMIT ${limit}
    `;
        return { results };
    }
};
exports.ProfileRetrievalService = ProfileRetrievalService;
exports.ProfileRetrievalService = ProfileRetrievalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        openai_embedding_service_1.OpenAiEmbeddingService])
], ProfileRetrievalService);
//# sourceMappingURL=profile-retrieval.service.js.map