import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSourceDto {
  @IsOptional()
  @IsIn(['resume', 'project', 'notes'])
  sourceType?: 'resume' | 'project' | 'notes';

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}
