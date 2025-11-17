/* eslint-disable import/no-named-as-default-member */
// eslint-disable-next-line import/default
import jwt from 'jsonwebtoken';
import type { JwtPayload } from '~~/server/types/auth';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export class JwtService {
    static generateAccessToken(payload: Omit<JwtPayload, 'type'>): string {
        return jwt.sign({ ...payload, type: 'access' }, JWT_ACCESS_SECRET, { expiresIn: '15m' });
    }

    static generateRefreshToken(payload: Omit<JwtPayload, 'type'>): string {
        return jwt.sign({ ...payload, type: 'refresh' }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    }

    static verifyAccessToken(token: string): JwtPayload {
        const payload = jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload;
        if (payload.type !== 'access') {
            throw new Error('Invalid token type');
        }
        return payload;
    }

    static verifyRefreshToken(token: string): JwtPayload {
        const payload = jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
        if (payload.type !== 'refresh') {
            throw new Error('Invalid token type');
        }
        return payload;
    }

    static generateTokens(
        userId: string,
        email: string
    ): { accessToken: string; refreshToken: string } {
        const payload = { userId, email };
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }
}
