import { PrismaService } from '../../prisma/prisma.service';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listAiRuns(userId: string, limit?: number, offset?: number): Promise<{
        items: {
            id: string;
            runType: string;
            model: string;
            promptTokens: number | null;
            completionTokens: number | null;
            totalTokens: number | null;
            latencyMs: number | null;
            status: string;
            errorMessage: string | null;
            inputPreview: string | null;
            outputPreview: string | null;
            retrievedChunkIds: string[];
            metadata: unknown;
            createdAt: Date;
        }[];
        total: number;
        limit: number;
        offset: number;
    }>;
    getAiRun(userId: string, id: string): Promise<{
        run: {
            id: string;
            runType: string;
            model: string;
            promptTokens: number | null;
            completionTokens: number | null;
            totalTokens: number | null;
            latencyMs: number | null;
            status: string;
            errorMessage: string | null;
            inputPreview: string | null;
            outputPreview: string | null;
            retrievedChunkIds: string[];
            metadata: unknown;
            createdAt: Date;
        };
    }>;
    getStats(userId: string): Promise<{
        jobsTotal: number;
        appliedCount: number;
        analysesCount: number;
        tokensThisWeek: number;
    }>;
    private toPublicRun;
}
