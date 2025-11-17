import User from '~~/server/db/models/User';
import { JwtService } from '~~/server/utils/jwt';

export default defineEventHandler(async event => {
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
        if (user) {
            user.clearRefreshToken();
            await user.save();
        }

        return {
            status: 'success',
            message: 'Успешный выход',
        };
    } catch (error) {
        return {
            status: 'success',
            message: 'Успешный выход',
        };
    }
});
