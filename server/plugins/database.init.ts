import { sequelize } from '~~/server/db/models';
import User from '~~/server/db/models/User';

export default defineNitroPlugin(async () => {
    try {
        await sequelize.authenticate();

        User.initialize(sequelize);

        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
        }
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
});
