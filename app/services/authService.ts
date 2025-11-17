import { apiService } from '~/utils/api';
import { ENDPOINTS } from '~/constants/endpoints';
import type {
    User,
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    RefreshResponse,
} from '~~/server/types/auth';
interface UserProfileResponse {
    data: {
        user: User;
    };
}
export class AuthService {
    static async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await apiService.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);

        this.setTokens(response.tokens);
        return response;
    }

    static async register(userData: RegisterRequest): Promise<AuthResponse> {
        const response = await apiService.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, userData);

        this.setTokens(response.tokens);
        return response;
    }

    static async refreshTokens(): Promise<RefreshResponse> {
        const refreshToken = this.getRefreshToken();

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }
        const url = `${apiService.getBaseURL()}${ENDPOINTS.AUTH.REFRESH}`;
        const response = await $fetch<RefreshResponse>(url, {
            method: 'POST',
            body: { refreshToken },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        localStorage.setItem('accessToken', response.tokens.accessToken);

        return response;
    }

    static async logout(): Promise<void> {
        try {
            await apiService.post(ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearTokens();
        }
    }

    static async getMe(): Promise<UserProfileResponse> {
        return await apiService.get<UserProfileResponse>(ENDPOINTS.AUTH.PROFILE);
    }

    static setTokens(tokens: { accessToken: string; refreshToken: string }): void {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
    }

    static getRefreshToken(): string | null {
        if (process.client) {
            return localStorage.getItem('refreshToken');
        }
        return null;
    }

    static clearTokens(): void {
        if (process.client) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    }
}
