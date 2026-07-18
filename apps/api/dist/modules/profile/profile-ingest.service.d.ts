import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiEmbeddingService } from './openai-embedding.service';
import { CreateSourceDto } from './dto/create-source.dto';
export declare class ProfileIngestService {
    private readonly prisma;
    private readonly embedding;
    constructor(prisma: PrismaService, embedding: OpenAiEmbeddingService);
    createSource(userId: string, dto: CreateSourceDto): Promise<{
        source: {
            id: string;
            sourceType: string;
            title: string;
            status: string;
            chunkCount: number;
            errorMessage: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    reindex(userId: string, sourceId: string): Promise<{
        source: {
            id: string;
            sourceType: string;
            title: string;
            status: string;
            chunkCount: number;
            errorMessage: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    private indexSource;
    listSources(userId: string): Promise<{
        items: {
            id: string;
            sourceType: string;
            title: string;
            status: string;
            chunkCount: number;
            errorMessage: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getSource(userId: string, id: string): Promise<{
        source: {
            id: string;
            sourceType: string;
            title: string;
            status: string;
            chunkCount: number;
            errorMessage: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deleteSource(userId: string, id: string): Promise<{
        success: boolean;
    }>;
    private toPublic;
}
