import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EncryptionModule } from 'src/shared/services/encryption/encryption.module';

@Module({
  imports: [EncryptionModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
