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

export { sequelize };
export { User };
