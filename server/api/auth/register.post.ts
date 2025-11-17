import User from '~~/server/db/models/User';
import type { AuthResponse, RegisterRequest } from '~~/server/types/auth';
import { CryptoService } from '~~/server/utils/crypto';
import { JwtService } from '~~/server/utils/jwt';

export default defineEventHandler(async event => {
    const body = await readBody<RegisterRequest>(event);
    const { name, email, password } = body;

    if (!name || !email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Все поля обязательны',
        });
    }

    if (password.length < 8) {
        throw createError({
            statusCode: 400,
            message: 'Пароль должен содержать минимум 8 символов',
        });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw createError({
                statusCode: 409,
                message: 'Пользователь с таким email уже существует',
            });
        }

        const passwordHash = await CryptoService.hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: passwordHash,
        });

        const tokens = JwtService.generateTokens(user.id, user.email);

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
            message: error.message,
        });
    }
});
