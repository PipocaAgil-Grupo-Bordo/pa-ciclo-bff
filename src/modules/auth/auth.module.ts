import { Module } from '@nestjs/common';
import { EncryptionModule } from '../../shared/services/encryption/encryption.module';
import { TokenModule } from '../../shared/services/token/token.module';
import { UserModule } from '../user/user.module';
import { VerificationCodeModule } from '../verification-code/verification-code.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [EncryptionModule, TokenModule, UserModule, VerificationCodeModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
