import { JobStatus } from '@huntkit/shared';
import { IsOptional, IsString, IsUrl, IsIn } from 'class-validator';

export class UpdateJobDto {
  @IsOptional() @IsString() company?: string;
  @IsOptional() @IsString() roleTitle?: string;
  @IsOptional() @IsString() jdText?: string;
  @IsOptional() @IsUrl() jobUrl?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional()
  @IsIn(Object.values(JobStatus))
  status?: JobStatus;
}
