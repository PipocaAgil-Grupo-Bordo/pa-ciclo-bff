import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { EncryptionModule } from 'src/shared/services/encryption/encryption.module';
import { EncryptionModule } from '../../shared/services/encryption/encryption.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../../shared/services/token/token.module';

@Module({
  imports: [EncryptionModule, TokenModule, UserModule],
  // imports: [TokenModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
