import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiEmbeddingService } from './openai-embedding.service';
export type RetrievedChunk = {
    id: string;
    content: string;
    source_title: string;
    score: number;
};
export declare class ProfileRetrievalService {
    private readonly prisma;
    private readonly embedding;
    constructor(prisma: PrismaService, embedding: OpenAiEmbeddingService);
    search(userId: string, query: string, limit?: number): Promise<{
        results: RetrievedChunk[];
    }>;
}
