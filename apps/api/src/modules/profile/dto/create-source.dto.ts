import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateSourceDto {
  @IsIn(['resume', 'project', 'notes'])
  sourceType!: 'resume' | 'project' | 'notes';

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
