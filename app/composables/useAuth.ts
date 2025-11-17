import { AuthService } from '~/services/authService';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '~~/server/types/auth';

export const useAuth = () => {
    const user = ref<User | null>(null);
    const isAuthenticated = computed(() => {
        if (process.client) {
            return !!localStorage.getItem('accessToken');
        }
        return false;
    });
    const isLoading = ref(false);

    const getAccessToken = (): string | null => {
        if (process.client) {
            return localStorage.getItem('accessToken');
        }
        return null;
    };

    const getRefreshToken = (): string | null => {
        if (process.client) {
            return AuthService.getRefreshToken();
        }
        return null;
    };

    const clearTokens = () => {
        AuthService.clearTokens();
        user.value = null;
    };

    const setTokens = (tokens: { accessToken: string; refreshToken: string }) => {
        AuthService.setTokens(tokens);
    };

    const refreshTokens = async (): Promise<{
        tokens: { accessToken: string; refreshToken: string };
    }> => {
        try {
            console.log('useAuth: Refreshing tokens...');
            const response = await AuthService.refreshTokens();
            return response;
        } catch (error) {
            console.error('useAuth: Token refresh failed', error);
            clearTokens();
            throw error;
        }
    };

    const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
        try {
            isLoading.value = true;
            const response = await AuthService.login(credentials);
            user.value = response.user;
            return response;
        } finally {
            isLoading.value = false;
        }
    };

    const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
        try {
            isLoading.value = true;
            const response = await AuthService.register(userData);
            user.value = response.user;
            return response;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearTokens();
            await navigateTo('/login');
        }
    };

    const fetchUserProfile = async () => {
        try {
            isLoading.value = true;
            const response = await AuthService.getMe();
            user.value = response.data.user;
            console.log('✅ User profile loaded:', user.value);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            if (getAccessToken()) {
                console.log('🔄 Token might be invalid, clearing...');
                clearTokens();
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        user: readonly(user),
        isAuthenticated,
        isLoading: readonly(isLoading),
        login,
        register,
        logout,
        getAccessToken,
        getRefreshToken,
        clearTokens,
        setTokens,
        refreshTokens,
        fetchUserProfile,
    };
};
