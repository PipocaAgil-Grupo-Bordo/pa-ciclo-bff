import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  readonly defaultAccessTokenExpiresIn = '1d';

  readonly defaultRefreshTokenExpiresIn = '30d';

  create(sub: Record<string, unknown> | string, options: JwtSignOptions = {}) {
    options.expiresIn = options.expiresIn ?? this.defaultAccessTokenExpiresIn;

    return this.jwtService.sign({ sub }, options);
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
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
