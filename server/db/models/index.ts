import { Sequelize } from 'sequelize';
import User from './User';

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    logging: false,
    // logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const models = {
    User: User.initialize(sequelize),
    // Добавьте другие модели здесь
};

// Object.values(models).forEach(model => {
//     if (model.associate) {
//         model.associate(models);
//     }
// });

export { sequelize };
export default models;
