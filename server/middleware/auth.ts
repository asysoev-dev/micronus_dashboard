import User from '~~/server/db/models/User';
import { JwtService } from '~~/server/utils/jwt';

export default defineEventHandler(async event => {
    if (!event.path?.startsWith('/api/')) {
        return;
    }
    const publicPaths = [
        '/api/auth/login',
        '/api/auth/register',
        '/api/auth/refresh',
        '/api/auth/logout',
        '/',
    ];

    if (event.path && publicPaths.includes(event.path)) {
        return;
    }

    const authHeader = getHeader(event, 'authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({
            statusCode: 401,
            message: 'Требуется авторизация',
        });
    }

    const token = authHeader.substring(7);

    try {
        const payload = JwtService.verifyAccessToken(token);

        const user = await User.findByPk(payload.userId);

        if (!user) {
            throw createError({
                statusCode: 401,
                message: 'Пользователь не найден',
            });
        }

        event.context.user = user.toJSON();
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Неверный токен',
        });
    }
});
