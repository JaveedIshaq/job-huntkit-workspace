import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { AuthUser } from '../shared/types/auth-user.type';
import { UpdateMeDto } from './dto/update-me.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    getMe(user: AuthUser): Promise<{
        id: string;
        email: string;
        displayName: string | null;
        headline: string | null;
    }>;
    updateMe(user: AuthUser, dto: UpdateMeDto): Promise<{
        id: string;
        email: string;
        displayName: string | null;
        headline: string | null;
    }>;
}
