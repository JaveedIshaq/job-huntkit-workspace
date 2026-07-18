// apps/api/src/modules/profile/profile-retrieval.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiEmbeddingService } from './openai-embedding.service';

export type RetrievedChunk = {
  id: string;
  content: string;
  source_title: string;
  score: number;
};

@Injectable()
export class ProfileRetrievalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly embedding: OpenAiEmbeddingService,
  ) {}

  async search(userId: string, query: string, limit = 8) {
    const [vector] = await this.embedding.embedBatch([query]);
    const vectorLiteral = `[${vector.join(',')}]`;

    const results = await this.prisma.$queryRaw<RetrievedChunk[]>`
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
}
