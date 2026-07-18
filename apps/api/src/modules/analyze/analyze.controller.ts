import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import type { AuthUser } from '../shared/types/auth-user.type';
import { AnalyzeService } from './analyze.service';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class AnalyzeController {
  constructor(private readonly analyze: AnalyzeService) {}

  @Post(':id/analyze')
  analyzeJob(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.analyze.analyzeJob(user.id, id);
  }
}
