import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EncryptionModule } from 'src/shared/services/encryption/encryption.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from 'src/shared/services/token/token.module';

@Module({
  imports: [EncryptionModule, TokenModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
