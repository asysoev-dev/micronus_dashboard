import { hash, compare } from 'bcrypt';

export class CryptoService {
    static async hashPassword(password: string): Promise<string> {
        if (!password) {
            throw new Error('Password is required');
        }
        const saltRounds = 12;
        return await hash(password, saltRounds);
    }

    static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        if (!password || !hashedPassword) {
            console.error('Password verification failed: missing arguments', {
                password: !!password,
                hashedPassword: !!hashedPassword,
            });
            return false;
        }

        try {
            return await compare(password, hashedPassword);
        } catch (error) {
            console.error('Password comparison error:', error);
            return false;
        }
    }
}
