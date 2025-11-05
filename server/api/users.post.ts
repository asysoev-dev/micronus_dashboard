// import databaseService from '~~/server/services/database.service';
import { hash } from 'bcrypt';
import User from '~~/server/db/models/User';

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const { email, password, name } = body;

    if (!email || !password || !name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Поля Email, Пароль и Имя являются обязательными',
        });
    }

    if (password.length < 8) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Длина пароля должна составлять не менее 6 символов',
        });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Пользователь с таким Email уже существует',
            });
        }

        const saltRounds = 12;
        const passwordHash = await hash(password, saltRounds);

        const user = await User.create({
            name,
            email,
            password: passwordHash,
        });
        // user.toJSON();
        return {
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
        };
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
    }
});
