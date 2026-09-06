import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiChatService } from '../analyze/openai-chat.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ParseJobPageDto } from './dto/parse-job-page.dto';
type ParsedJobPage = {
    company: string;
    roleTitle: string;
    location: string | null;
    jobUrl: string | null;
    jdText: string;
};
export declare class JobsService {
    private readonly prisma;
    private readonly chat;
    constructor(prisma: PrismaService, chat: OpenAiChatService);
    parsePage(userId: string, dto: ParseJobPageDto): Promise<{
        fields: ParsedJobPage;
    }>;
    private parseExtractedFields;
    create(userId: string, dto: CreateJobDto): Promise<{
        job: {
            id: string;
            company: string;
            roleTitle: string;
            jobUrl: string | null;
            location: string | null;
            status: string;
            jdText: string;
            notes: string | null;
            appliedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(userId: string, status?: string): Promise<{
        items: {
            id: string;
            company: string;
            roleTitle: string;
            jobUrl: string | null;
            location: string | null;
            status: string;
            jdText: string;
            notes: string | null;
            appliedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        countsByStatus: Record<string, number>;
    }>;
    findOne(userId: string, id: string): Promise<{
        job: {
            id: string;
            company: string;
            roleTitle: string;
            jobUrl: string | null;
            location: string | null;
            status: string;
            jdText: string;
            notes: string | null;
            appliedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        latestAnalysis: {
            overallMatchScore: number;
            createdAt: Date;
            eligibility?: object | undefined;
            analysisId: string;
            runId: string | null;
            requirementSummary: string;
            strengths: {};
            gaps: {};
            applicationBullets: {};
            interviewQuestions: {};
            citations: {};
        } | null;
    }>;
    update(userId: string, id: string, dto: UpdateJobDto): Promise<{
        job: {
            id: string;
            company: string;
            roleTitle: string;
            jobUrl: string | null;
            location: string | null;
            status: string;
            jdText: string;
            notes: string | null;
            appliedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(userId: string, id: string): Promise<{
        success: boolean;
    }>;
    private ensureOwned;
    private toPublic;
    private toPublicAnalysis;
}
export {};
