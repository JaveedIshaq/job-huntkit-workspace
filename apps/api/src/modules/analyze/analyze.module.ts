import { Module } from '@nestjs/common';
import { AnalyzeController } from './analyze.controller';
import { AnalyzeService } from './analyze.service';
import { OpenAiChatService } from './openai-chat.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [ProfileModule],
  controllers: [AnalyzeController],
  providers: [AnalyzeService, OpenAiChatService],
  exports: [OpenAiChatService],
})
export class AnalyzeModule {}
