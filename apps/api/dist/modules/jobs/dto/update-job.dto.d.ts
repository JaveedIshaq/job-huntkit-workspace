import { JobStatus } from '@huntkit/shared';
export declare class UpdateJobDto {
    company?: string;
    roleTitle?: string;
    jdText?: string;
    jobUrl?: string | null;
    location?: string | null;
    notes?: string | null;
    status?: JobStatus;
}
