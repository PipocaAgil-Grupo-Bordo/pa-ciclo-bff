import { Body, Controller, Patch, Post } from '@nestjs/common';
import { VerificationCodeService } from '../verification-code/verification-code.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordRequestDto } from './dtos/reset-password-request.dto';
import { VerificationCodeValidationDto } from './dtos/verification-code-validation.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationCodeService: VerificationCodeService,
  ) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Patch('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(body);
  }

  @Post('reset-password/request')
  async requestPasswordReset(@Body() { email }: ResetPasswordRequestDto) {
    return await this.authService.requestPasswordReset(email);
  }

  @Post('reset-password/validate')
  async validateVerificationCode(@Body() body: VerificationCodeValidationDto) {
    return await this.authService.validateVerificationCode(body);
  }
}
