import { JobStatus } from '@huntkit/shared';
export declare class CreateJobDto {
    company: string;
    roleTitle: string;
    jdText: string;
    jobUrl?: string;
    location?: string;
    notes?: string;
    status?: JobStatus;
}
