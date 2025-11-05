import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string | null;
    refreshToken: string | null;
    refreshTokenExpires: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

interface UserCreationAttributes
    extends Optional<
        UserAttributes,
        'id' | 'refreshToken' | 'refreshTokenExpires' | 'createdAt' | 'updatedAt'
    > {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string | null;
    declare refreshToken: string | null;
    declare refreshTokenExpires: Date | null;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    static initialize(sequelize: Sequelize) {
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
                refreshToken: {
                    type: DataTypes.STRING(512),
                    allowNull: true,
                    field: 'refresh_token',
                },
                refreshTokenExpires: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    field: 'refresh_token_expires',
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
        return User;
    }
}

export default User;
