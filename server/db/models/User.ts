import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    refreshToken: string | null;
    refreshTokenExpires: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreationAttributes
    extends Optional<
        UserAttributes,
        'id' | 'refreshToken' | 'refreshTokenExpires' | 'createdAt' | 'updatedAt'
    > {}

export interface UserSafeAttributes {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public get id(): string {
        return this.getDataValue('id');
    }

    public get name(): string {
        return this.getDataValue('name');
    }

    public get email(): string {
        return this.getDataValue('email');
    }

    public get password(): string {
        return this.getDataValue('password');
    }

    public get refreshToken(): string | null {
        return this.getDataValue('refreshToken');
    }

    public set refreshToken(value: string | null) {
        this.setDataValue('refreshToken', value);
    }

    public get refreshTokenExpires(): Date | null {
        return this.getDataValue('refreshTokenExpires');
    }

    public set refreshTokenExpires(value: Date | null) {
        this.setDataValue('refreshTokenExpires', value);
    }

    public get createdAt(): Date {
        return this.getDataValue('createdAt');
    }

    public get updatedAt(): Date {
        return this.getDataValue('updatedAt');
    }

    static initialize(sequelize: Sequelize) {
        User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
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

    public isRefreshTokenValid(token: string): boolean {
        if (!this.refreshToken || !this.refreshTokenExpires) {
            return false;
        }

        const now = new Date();
        return this.refreshToken === token && this.refreshTokenExpires > now;
    }

    public setRefreshToken(token: string): void {
        this.refreshToken = token;
        this.refreshTokenExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней
    }

    public clearRefreshToken(): void {
        this.refreshToken = null;
        this.refreshTokenExpires = null;
    }

    public toJSON(): UserSafeAttributes {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

export default User;
