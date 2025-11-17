import { User } from '~~/server/db/models';

export default defineEventHandler(async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'createdAt'],
        });
        return {
            status: 'success',
            data: {
                users: users.map(user => user.toJSON()),
            },
        };
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch users',
            message: error.message,
        });
    }
});
