import { PrismaService } from '../../prisma/prisma.service';
import { ProfileRetrievalService } from '../profile/profile-retrieval.service';
import { OpenAiChatService } from './openai-chat.service';
export type EligibilityVerdict = 'apply' | 'apply_low_priority' | 'skip';
export type EligibilityConfidence = 'high' | 'medium' | 'low';
export type RemoteScope = 'worldwide' | 'country_or_region_only' | 'onsite_or_hybrid' | 'unclear';
export type EmploymentType = 'contractor_b2b' | 'local_payroll' | 'staffing_agency' | 'unclear';
export type RiskLevel = 'low' | 'medium' | 'high' | 'unclear';
export type PayVsFloor = 'above' | 'near' | 'below' | 'unclear';
export type Eligibility = {
    verdict: EligibilityVerdict;
    confidence: EligibilityConfidence;
    remoteScope: RemoteScope;
    employmentType: EmploymentType;
    workAuthRisk: RiskLevel;
    languageRisk: RiskLevel;
    payVsFloor: PayVsFloor;
    roleFitNote: string;
    reasons: string[];
    summary: string;
};
export declare class AnalyzeService {
    private readonly prisma;
    private readonly retrieval;
    private readonly chat;
    constructor(prisma: PrismaService, retrieval: ProfileRetrievalService, chat: OpenAiChatService);
    analyzeJob(userId: string, jobId: string): Promise<{
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
        eligibility?: undefined;
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
        eligibility: Eligibility;
        overallMatchScore: number;
        usage: {
            promptTokens: number;
            completionTokens: number;
            totalTokens: number;
        };
        latencyMs: number;
        message?: undefined;
    }>;
    private parseAnalysis;
    private parseEligibility;
    private oneOf;
    private clampScore;
}
