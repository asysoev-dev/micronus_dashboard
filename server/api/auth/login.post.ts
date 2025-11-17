import User from '~~/server/db/models/User';
import { CryptoService } from '~~/server/utils/crypto';
import { JwtService } from '~~/server/utils/jwt';
import type { LoginRequest, AuthResponse } from '~~/server/types/auth';

export default defineEventHandler(async event => {
    const body = await readBody<LoginRequest>(event);
    const { email, password } = body;

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email и пароль обязательны',
        });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !user?.password) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Неверный email или пароль',
            });
        }

        const isPasswordValid = await CryptoService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Неверный email или пароль',
            });
        }

        const tokens = JwtService.generateTokens(user.id, user.email);

        // Сохраняем refresh токен в БД
        user.setRefreshToken(tokens.refreshToken);
        await user.save();

        const response: AuthResponse = {
            user: user.toJSON(),
            tokens,
        };

        return response;
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
    }
});
