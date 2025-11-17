export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface RefreshRequest {
    refreshToken: string;
}

export interface RefreshResponse {
    tokens: AuthTokens;
}

export interface JwtPayload {
    userId: string;
    email: string;
    type: 'access' | 'refresh';
}
