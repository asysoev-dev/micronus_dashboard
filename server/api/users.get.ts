import databaseService from '~~/server/services/database.service';

export default defineEventHandler(async event => {
    try {
        const users = await databaseService.getUsers();
        console.log('%c[LOG]event: ', 'color: green;', event);
        return {
            status: 'success',
            data: {
                users: users.map(user => user.toJSON()),
                count: users.length,
            },
            timestamp: new Date().toISOString(),
        };
    } catch (error: any) {
        console.error('Sequelize error in /api/users:', error);

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: {
                status: 'error',
                message: 'Не удалось получить данные пользователей',
            },
        });
    }
});
