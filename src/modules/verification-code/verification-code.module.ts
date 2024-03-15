import { Module } from '@nestjs/common';
import { VerificationCodeRepository } from './verification-code.repository';
import { VerificationCodeService } from './verification-code.service';

@Module({
  controllers: [],
  exports: [VerificationCodeService],
  providers: [VerificationCodeService, VerificationCodeRepository],
})
export class VerificationCodeModule {}
