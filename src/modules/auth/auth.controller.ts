import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('reset-password/request')
  async requestPasswordReset(@Body() { email }: { email: string }) {
    return await this.authService.requestPasswordReset(email);
  }
}
