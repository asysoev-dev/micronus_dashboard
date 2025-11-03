import { apiService } from '~/utils/api';
import { ENDPOINTS } from '~/constants/endpoints';

export interface AuthResponse {
    user: any;
    token: string;
}

export interface RegisterData {
    login: string;
    password: string;
}

class AuthService {
    register(userData: RegisterData): Promise<AuthResponse> {
        return apiService.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, userData);
    }
}

export const authService = new AuthService();
