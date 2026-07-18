import type { AuthUser } from '../shared/types/auth-user.type';
import { AnalyzeService } from './analyze.service';
export declare class AnalyzeController {
    private readonly analyze;
    constructor(analyze: AnalyzeService);
    analyzeJob(user: AuthUser, id: string): Promise<{
        analysisId: null;
        runId: string;
        status: string;
        message: string;
        bestScore?: undefined;
        requirementSummary?: undefined;
        strengths?: undefined;
        gaps?: undefined;
        applicationBullets?: undefined;
        interviewQuestions?: undefined;
        citations?: undefined;
        overallMatchScore?: undefined;
        usage?: undefined;
        latencyMs?: undefined;
    } | {
        analysisId: string;
        runId: string;
        status: string;
        bestScore: number;
        requirementSummary: string;
        strengths: {
            text: string;
            chunkId?: string;
        }[];
        gaps: {
            text: string;
            suggestion?: string;
        }[];
        applicationBullets: {
            text: string;
            chunkIds?: string[];
            confidence?: "high" | "medium";
        }[];
        interviewQuestions: {
            question: string;
            whyLikely?: string;
            prepHint?: string;
        }[];
        citations: {
            chunkId: string;
            sourceTitle: string;
            excerpt: string;
            score: number;
        }[];
        overallMatchScore: number;
        usage: {
            promptTokens: number;
            completionTokens: number;
            totalTokens: number;
        };
        latencyMs: number;
        message?: undefined;
    }>;
}
