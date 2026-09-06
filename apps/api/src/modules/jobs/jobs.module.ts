import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { AnalyzeModule } from '../analyze/analyze.module';

@Module({
  imports: [AnalyzeModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
