// apps/api/src/modules/profile/profile.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import type { AuthUser } from '../shared/types/auth-user.type';
import { ProfileIngestService } from './profile-ingest.service';
import { ProfileRetrievalService } from './profile-retrieval.service';
import { CreateSourceDto } from './dto/create-source.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly ingest: ProfileIngestService,
    private readonly retrieval: ProfileRetrievalService,
  ) {}

  @Post('sources')
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateSourceDto) {
    return this.ingest.createSource(user.id, dto);
  }

  @Get('sources')
  list(@CurrentUser() user: AuthUser) {
    return this.ingest.listSources(user.id);
  }

  @Get('sources/:id')
  getOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.ingest.getSource(user.id, id);
  }

  @Delete('sources/:id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.ingest.deleteSource(user.id, id);
  }

  @Post('sources/:id/reindex')
  reindex(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.ingest.reindex(user.id, id);
  }

  // Dev only — delete this route before production.
  @Get('search')
  search(@CurrentUser() user: AuthUser, @Query('q') q: string) {
    return this.retrieval.search(user.id, q);
  }
}
