// apps/api/src/modules/profile/profile-ingest.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiEmbeddingService } from './openai-embedding.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { chunkText } from './utils/chunk-text';

@Injectable()
export class ProfileIngestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly embedding: OpenAiEmbeddingService,
  ) {}

  async createSource(userId: string, dto: CreateSourceDto) {
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

  async reindex(userId: string, sourceId: string) {
    const source = await this.prisma.profile_sources.findFirst({
      where: { id: sourceId, user_id: userId },
    });
    if (!source) throw new NotFoundException('Source not found');

    // Wipe old chunks, then rebuild from the stored content.
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

  // Chunk → embed → raw insert → mark ready. On failure: mark failed + rethrow.
  private async indexSource(userId: string, sourceId: string, content: string) {
    try {
      const chunks = chunkText(content);
      const vectors = await this.embedding.embedBatch(
        chunks.map((c) => c.content),
      );

      for (let i = 0; i < chunks.length; i++) {
        const vectorLiteral = `[${vectors[i].join(',')}]`;
        await this.prisma.$executeRaw`
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
    } catch (err) {
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

  async listSources(userId: string) {
    const items = await this.prisma.profile_sources.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
    return { items: items.map((s) => this.toPublic(s)) };
  }

  async getSource(userId: string, id: string) {
    const source = await this.prisma.profile_sources.findFirst({
      where: { id, user_id: userId },
    });
    if (!source) throw new NotFoundException('Source not found');
    return { source: this.toPublic(source) };
  }

  async deleteSource(userId: string, id: string) {
    const found = await this.prisma.profile_sources.findFirst({
      where: { id, user_id: userId },
      select: { id: true },
    });
    if (!found) throw new NotFoundException('Source not found');
    // profile_chunks has ON DELETE CASCADE, so chunks go too.
    await this.prisma.profile_sources.delete({ where: { id } });
    return { success: true };
  }

  private toPublic(s: {
    id: string;
    source_type: string;
    title: string;
    status: string;
    chunk_count: number;
    error_message: string | null;
    created_at: Date;
    updated_at: Date;
  }) {
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
}
