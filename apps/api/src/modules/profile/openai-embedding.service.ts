// apps/api/src/modules/profile/openai-embedding.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

const EMBEDDING_MODEL = 'text-embedding-3-small'; // 1536 dims → matches the column

@Injectable()
export class OpenAiEmbeddingService {
  private readonly client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
    this.client = new OpenAI({ apiKey });
  }

  async embedBatch(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];
    try {
      const res = await this.client.embeddings.create({
        model: EMBEDDING_MODEL,
        input: texts,
      });
      return res.data.map((d) => d.embedding);
    } catch (err) {
      throw new InternalServerErrorException(
        `Embedding failed: ${String(err)}`,
      );
    }
  }
}
