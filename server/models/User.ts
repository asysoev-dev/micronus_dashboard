import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string | null;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 255],
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at',
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        underscored: true,
    }
);

export default User;
