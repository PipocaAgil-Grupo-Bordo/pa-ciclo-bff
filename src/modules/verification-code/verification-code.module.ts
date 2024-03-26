import { Module } from '@nestjs/common';
import { VerificationCodeRepository } from './verification-code.repository';
import { VerificationCodeService } from './verification-code.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [],
  imports: [UserModule],
  exports: [VerificationCodeService],
  providers: [VerificationCodeService, VerificationCodeRepository],
})
export class VerificationCodeModule {}
