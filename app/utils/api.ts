class ApiService {
    public getBaseURL(): string {
        const config = useRuntimeConfig();
        return config.public.apiBaseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: {
            method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
            body?: any;
            params?: Record<string, any>;
            headers?: Record<string, any>;
        } = {}
    ): Promise<T> {
        const url = `${this.getBaseURL()}${endpoint}`;

        const auth = useAuth();
        const token = auth.getAccessToken();

        const config = {
            method: options.method || 'GET',
            body: options.body,
            params: options.params,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        };

        try {
            const response = await $fetch<T>(url, config);
            return response as T;
        } catch (error: any) {
            if (error.status === 401 && auth.getRefreshToken()) {
                try {
                    const { tokens } = await auth.refreshTokens();

                    const retryConfig = {
                        ...config,
                        headers: {
                            ...config.headers,
                            Authorization: `Bearer ${tokens.accessToken}`,
                        },
                    };

                    const retryResponse = await $fetch<T>(url, retryConfig);
                    return retryResponse as T;
                } catch (refreshError) {
                    console.error('ApiService: Token refresh failed:', refreshError);
                    this.handleAuthError(auth);
                    throw refreshError;
                }
            }

            this.handleError(error);
            throw error;
        }
    }

    private handleAuthError(auth: any): void {
        if (process.client) {
            console.log('ApiService: Authentication failed, clearing tokens...');
            auth.clearTokens();

            const router = useRouter();
            router.push('/login');
        }
    }

    private handleError(error: any) {
        console.error('API Error:', error);
    }

    get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'GET',
            params,
        });
    }

    post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data,
        });
    }

    put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data,
        });
    }

    patch<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: data,
        });
    }

    delete<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
            params,
        });
    }
}

export const apiService = new ApiService();
