import { JobsService } from './jobs.service';
import type { AuthUser } from '../shared/types/auth-user.type';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(user: AuthUser, dto: CreateJobDto): Promise<{
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
    findAll(user: AuthUser, status?: string): Promise<{
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
    findOne(user: AuthUser, id: string): Promise<{
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
    update(user: AuthUser, id: string, dto: UpdateJobDto): Promise<{
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
    remove(user: AuthUser, id: string): Promise<{
        success: boolean;
    }>;
}
