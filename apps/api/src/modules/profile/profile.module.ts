import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileIngestService } from './profile-ingest.service';
import { ProfileRetrievalService } from './profile-retrieval.service';
import { OpenAiEmbeddingService } from './openai-embedding.service';

@Module({
  controllers: [ProfileController],
  providers: [
    ProfileIngestService,
    ProfileRetrievalService,
    OpenAiEmbeddingService,
  ],
  exports: [ProfileRetrievalService, OpenAiEmbeddingService],
})
export class ProfileModule {}
