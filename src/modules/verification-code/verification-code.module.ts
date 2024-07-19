import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { VerificationCodeRepository } from './verification-code.repository';
import { VerificationCodeService } from './verification-code.service';

@Module({
    controllers: [],
    imports: [UserModule],
    exports: [VerificationCodeService],
    providers: [VerificationCodeService, VerificationCodeRepository],
})
export class VerificationCodeModule {}
