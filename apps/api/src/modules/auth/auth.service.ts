import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from '../shared/types/jwt-payload.type';
import { LoginDto } from './dto/login.dto';
import { UpdateMeDto } from './dto/update-me.dto';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Public sign-up is opt-in. In production we leave SIGNUP_ENABLED unset,
    // so accounts can only be created via the seed script (see scripts/).
    if (process.env.SIGNUP_ENABLED !== 'true') {
      throw new ForbiddenException('Public sign-up is disabled.');
    }

    const existing = await this.prisma.users.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const password_hash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);

    const user = await this.prisma.users.create({
      data: {
        email: dto.email.toLowerCase(),
        password_hash,
        display_name: dto.displayName ?? null,
      },
    });

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user?.password_hash) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const passwordValid = await bcrypt.compare(
      dto.password,
      user.password_hash,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.buildAuthResponse(user);
  }

  async getMe(userId: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.toPublicUser(user);
  }

  async updateMe(userId: string, dto: UpdateMeDto) {
    const user = await this.prisma.users.update({
      where: { id: userId },
      data: {
        display_name: dto.displayName,
        headline: dto.headline,
        updated_at: new Date(),
      },
    });
    return this.toPublicUser(user);
  }

  private buildAuthResponse(user: {
    id: string;
    email: string;
    display_name: string | null;
    headline: string | null;
  }) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: this.toPublicUser(user),
    };
  }

  private toPublicUser(user: {
    id: string;
    email: string;
    display_name: string | null;
    headline: string | null;
  }) {
    return {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      headline: user.headline,
    };
  }
}
