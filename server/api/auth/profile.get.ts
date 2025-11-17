import User from '~~/server/db/models/User';

export default defineEventHandler(async event => {
    const userFromContext = event.context.user;

    if (!userFromContext) {
        throw createError({
            statusCode: 401,
            message: 'Требуется авторизация',
        });
    }

    try {
        const user = await User.findByPk(userFromContext.id, {
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        });
        if (!user) {
            throw createError({
                statusCode: 404,
                message: 'Пользователь не найден',
            });
        }

        return {
            status: 'success',
            data: {
                user: user.toJSON(),
            },
        };
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Ошибка при получении данных пользователя',
            message: error.message,
        });
    }
});
