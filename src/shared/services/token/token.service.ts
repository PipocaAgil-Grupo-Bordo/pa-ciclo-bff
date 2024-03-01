import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { CustomInternalServerErrorException } from 'src/shared/exceptions/http-exception';

export class TokenService {
  constructor(private configService: ConfigService) {}
  create(sub: Record<string, unknown> | string) {
    return sign({ sub }, this.tokenSecret());
  }

  private tokenSecret() {
    const value = this.configService.getOrThrow<string>('TOKEN_SECRET');

    if (!value) {
      throw new CustomInternalServerErrorException({
        code: 'token-secret-required-for-authentication-processes',
        message: 'Token secret is required for authentication processes.',
      });
    }
    return value;
  }
}
