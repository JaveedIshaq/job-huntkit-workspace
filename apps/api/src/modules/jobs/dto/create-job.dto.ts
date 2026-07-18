import { IsIn, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { JobStatus } from '@huntkit/shared';
export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  roleTitle!: string;

  @IsString()
  @IsNotEmpty()
  jdText!: string;

  @IsOptional()
  @IsUrl()
  jobUrl?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsIn(Object.values(JobStatus))
  status?: JobStatus;
}
