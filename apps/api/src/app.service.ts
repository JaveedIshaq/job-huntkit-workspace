import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async testDb(): Promise<string> {
    const users = await this.prisma.users.findMany();
    return `Users: ${users.length}`;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
