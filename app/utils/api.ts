class ApiService {
    private getBaseURL(): string {
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

        const config = {
            method: options.method || 'GET',
            body: options.body,
            params: options.params,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        };

        try {
            const response = await $fetch<T>(url, config);
            return response as T;
        } catch (error) {
            // TODO Добавить обработчик ошибок
            this.handleError(error);
            throw error;
        }
    }

    private handleError(error: any) {
        // TODO Добавить показ toast-уведомлений
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
