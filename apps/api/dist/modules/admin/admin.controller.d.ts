import type { AuthUser } from '../shared/types/auth-user.type';
import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly admin;
    constructor(admin: AdminService);
    listAiRuns(user: AuthUser, limit?: string, offset?: string): Promise<{
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
    getAiRun(user: AuthUser, id: string): Promise<{
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
    getStats(user: AuthUser): Promise<{
        jobsTotal: number;
        appliedCount: number;
        analysesCount: number;
        tokensThisWeek: number;
    }>;
}
