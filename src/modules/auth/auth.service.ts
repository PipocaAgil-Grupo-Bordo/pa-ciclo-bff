import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { EncryptionService } from 'src/shared/services/encryption/encryption.service';
import { CustomUnauthorizedException } from 'src/shared/exceptions/http-exception';
import { TokenService } from 'src/shared/services/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private encryptionService: EncryptionService,
    private tokenService: TokenService,
  ) {}
  async login(body: LoginDto) {
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      throw new CustomUnauthorizedException({
        code: 'invalid-username-or-password',
        message: 'Invalid username or password',
      });
    }

    const passwordMatch = await this.encryptionService.compare(
      body.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new CustomUnauthorizedException({
        code: 'invalid-username-or-password',
        message: 'Invalid username or password',
      });
    }

    const tokenSub: Record<string, unknown> = {
      userId: user.id,
      email: user.email,
    };

    const token = this.tokenService.createPair(tokenSub);

    delete user.password;

    return { user, token };
  }
}
