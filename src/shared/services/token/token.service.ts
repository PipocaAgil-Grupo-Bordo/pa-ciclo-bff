import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    readonly defaultAccessTokenExpiresIn = '1d';

    readonly defaultRefreshTokenExpiresIn = '30d';

    create(sub: Record<string, unknown> | string, options: JwtSignOptions = {}) {
        options.expiresIn = options.expiresIn ?? this.defaultAccessTokenExpiresIn;

        return this.jwtService.sign({ sub }, { ...options, secret: process.env.TOKEN_SECRET });
    }

    createPair(sub: Record<string, unknown> | string) {
        const accessToken = this.create(sub);
        const refreshToken = this.create(accessToken, {
            expiresIn: this.defaultRefreshTokenExpiresIn,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    decode(token: string): any {
        try {
            return this.jwtService.decode(token);
        } catch (error) {
            return null;
        }
    }

    verify(token: string): string | JwtPayload {
        try {
            return this.jwtService.verify(token);
        } catch {
            throw new ForbiddenException();
        }
    }
}
