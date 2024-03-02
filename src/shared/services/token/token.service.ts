import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignOptions, sign } from 'jsonwebtoken';
import { CustomInternalServerErrorException } from 'src/shared/exceptions/http-exception';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  readonly defaultAccessTokenExpiresIn = '1d';

  readonly defaultRefreshTokenExpiresIn = '30d';

  create(sub: Record<string, unknown> | string, options: SignOptions = {}) {
    options.expiresIn = options.expiresIn ?? this.defaultAccessTokenExpiresIn;

    return sign({ sub }, this.tokenSecret(), options);
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

  private tokenSecret() {
    const value = this.configService.get<string>('TOKEN_SECRET');

    if (!value) {
      throw new CustomInternalServerErrorException({
        code: 'token-secret-required-for-authentication-processes',
        message: 'Token secret is required for authentication processes.',
      });
    }
    return value;
  }
}
