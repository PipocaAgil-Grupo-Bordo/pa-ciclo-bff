import { Module } from '@nestjs/common';
import { EmailModule } from '../../shared/services/email/email.module';
import { EncryptionModule } from '../../shared/services/encryption/encryption.module';
import { TokenModule } from '../../shared/services/token/token.module';
import { UserModule } from '../user/user.module';
import { VerificationCodeModule } from '../verification-code/verification-code.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    EncryptionModule,
    TokenModule,
    UserModule,
    VerificationCodeModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
