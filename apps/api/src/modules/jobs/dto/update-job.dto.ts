import { JobStatus } from '@huntkit/shared';
import {
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';

export class UpdateJobDto {
  @IsOptional() @IsString() company?: string;
  @IsOptional() @IsString() roleTitle?: string;
  @IsOptional() @IsString() jdText?: string;
  /** Empty string or null clears the URL; omit to leave unchanged. */
  @IsOptional()
  @ValidateIf((_, v) => v != null && v !== '')
  @IsUrl()
  jobUrl?: string | null;
  @IsOptional() @IsString() location?: string | null;
  @IsOptional() @IsString() notes?: string | null;
  @IsOptional()
  @IsIn(Object.values(JobStatus))
  status?: JobStatus;
}
