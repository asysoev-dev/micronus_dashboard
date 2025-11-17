import User from '~~/server/db/models/User';
import { JwtService } from '~~/server/utils/jwt';
import type { RefreshRequest, AuthResponse } from '~~/server/types/auth';

export default defineEventHandler(async event => {
    const body = await readBody<RefreshRequest>(event);
    const { refreshToken } = body;

    if (!refreshToken) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Refresh token обязателен',
        });
    }

    try {
        const payload = JwtService.verifyRefreshToken(refreshToken);

        const user = await User.findOne({
            where: { id: payload.userId },
        });

        if (!user || !user.isRefreshTokenValid(refreshToken)) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Неверный refresh token',
            });
        }

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
            statusCode: 401,
            statusMessage: 'Неверный refresh token',
        });
    }
});
