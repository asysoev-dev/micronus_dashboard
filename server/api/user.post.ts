import databaseService from '~~/server/services/database.service';

export default defineEventHandler(async event => {
    const body = await readBody(event);

    try {
        const user = await databaseService.createUser({
            login: body.login,
            password: body.password,
        });

        return {
            status: 'success',
            data: {
                user: user.toJSON(),
            },
        };
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
    }
});
