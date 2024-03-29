import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VerificationCodeService } from '../verification-code/verification-code.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordRequestDto } from './dtos/reset-password-request.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { VerificationCodeValidationDto } from './dtos/verification-code-validation.dto';

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

  @Get('whoami')
  @UseGuards(AuthGuard('jwt'))
  whoami(@Request() req) {
    const user = req.user;
    return user;
  }

  @Patch('reset-password')
  @UseGuards(AuthGuard('jwt'))
  async resetPassword(@Request() req, @Body() { password }: ResetPasswordDto) {
    const user = req.user;

    return await this.authService.resetPassword(user.id, password);
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
