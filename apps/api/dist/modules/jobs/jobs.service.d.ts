import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
            analysisId: string;
            runId: string | null;
            requirementSummary: string;
            strengths: {};
            gaps: {};
            applicationBullets: {};
            interviewQuestions: {};
            citations: {};
            overallMatchScore: number;
            createdAt: Date;
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
