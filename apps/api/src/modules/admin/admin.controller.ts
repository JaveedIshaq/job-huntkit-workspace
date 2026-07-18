import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import type { AuthUser } from '../shared/types/auth-user.type';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('ai-runs')
  listAiRuns(
    @CurrentUser() user: AuthUser,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.admin.listAiRuns(
      user.id,
      limit ? Number(limit) : 50,
      offset ? Number(offset) : 0,
    );
  }

  @Get('ai-runs/:id')
  getAiRun(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.admin.getAiRun(user.id, id);
  }

  @Get('stats')
  getStats(@CurrentUser() user: AuthUser) {
    return this.admin.getStats(user.id);
  }
}
