import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ParseJobPageDto {
  /** Full Ctrl+A / Ctrl+C paste from a job posting page (including chrome). */
  @IsString()
  @IsNotEmpty()
  @MaxLength(100_000)
  pageText!: string;
}
