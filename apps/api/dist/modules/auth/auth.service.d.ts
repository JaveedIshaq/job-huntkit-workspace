import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateMeDto } from './dto/update-me.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            displayName: string | null;
            headline: string | null;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            displayName: string | null;
            headline: string | null;
        };
    }>;
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        displayName: string | null;
        headline: string | null;
    }>;
    updateMe(userId: string, dto: UpdateMeDto): Promise<{
        id: string;
        email: string;
        displayName: string | null;
        headline: string | null;
    }>;
    private buildAuthResponse;
    private toPublicUser;
}
