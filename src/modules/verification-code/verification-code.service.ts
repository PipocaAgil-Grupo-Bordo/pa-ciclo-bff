import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { MoreThanOrEqual } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { VerificationCodeRepository } from './verification-code.repository';

@Injectable()
export class VerificationCodeService {
  constructor(private verificationCodeRepository: VerificationCodeRepository) {}

  insert(code: string, email: string) {
    const expiresAt = DateTime.now()
      .plus({ hours: 1 })
      .toJSDate()
      .toISOString();

    return this.verificationCodeRepository.save({ code, email, expiresAt });
  }

  validate(code: string, email: string) {
    return this.verificationCodeRepository.findOne({
      where: {
        code,
        email,
        expiresAt: MoreThanOrEqual(new Date()),
        isUsed: false,
      },
    });
  }

  async generate() {
    const code = Math.floor(100000 + Math.random() * 900000);

    return code.toString();
  }
}
