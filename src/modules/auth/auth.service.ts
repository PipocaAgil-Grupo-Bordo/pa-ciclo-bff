import { Injectable } from '@nestjs/common';
import {
  CustomNotFoundException,
  CustomUnauthorizedException,
} from '../../shared/exceptions/http-exception';
import { EncryptionService } from '../../shared/services/encryption/encryption.service';
import { TokenService } from '../../shared/services/token/token.service';
import { UserService } from '../user/user.service';
import { VerificationCodeService } from '../verification-code/verification-code.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private encryptionService: EncryptionService,
    private tokenService: TokenService,
    private verificationCodeService: VerificationCodeService,
  ) {}
  async login(body: LoginDto) {
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      throw new CustomUnauthorizedException({
        code: 'invalid-email-or-password',
        message: 'Invalid email or password',
      });
    }

    const passwordMatch = await this.encryptionService.compare(
      body.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new CustomUnauthorizedException({
        code: 'invalid-email-or-password',
        message: 'Invalid email or password',
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

  async requestPasswordReset(email: string) {
    const emailExists = this.userService.findByEmail(email);

    if (!emailExists) {
      throw new CustomNotFoundException({
        code: 'email-not-found',
        message: 'Email not found',
      });
    }

    const verificationCode = await this.verificationCodeService.generate();

    //Call the emailService and send email

    // this.verificationCodeService.insert(verificationCode, email);

    return verificationCode;
  }
}
