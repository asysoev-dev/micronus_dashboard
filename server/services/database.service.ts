import User from '~~/server/models/User';
import { sequelize } from '~~/server/models/index';

export const databaseService = {
    async initialize() {
        try {
            await sequelize.authenticate();

            if (process.env.NODE_ENV === 'development') {
                await sequelize.sync({ alter: true });
            }

            return true;
        } catch (error) {
            console.error('ошибка подключения sequelize:', error);
            throw error;
        }
    },

    // Получить всех пользователей
    async getUsers() {
        return await User.findAll({
            order: [['created_at', 'DESC']],
        });
    },

    // Получить пользователя по ID
    async getUserById(id: number) {
        return await User.findByPk(id);
    },

    // Получить пользователя по login
    async getUserByEmail(login: string) {
        return await User.findOne({ where: { login } });
    },

    // Создать пользователя
    async createUser(userData: { login: string; password?: string }) {
        return await User.create(userData);
    },

    // Обновить пользователя
    async updateUser(id: number, userData: Partial<{ login: string; password: string }>) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('Пользователь не найден');

        return await user.update(userData);
    },

    // Удалить пользователя
    async deleteUser(id: number) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('Пользователь не найден');

        await user.destroy();
        return { message: 'Пользователь удален' };
    },
};

export default databaseService;
