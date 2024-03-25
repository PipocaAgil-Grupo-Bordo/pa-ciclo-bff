import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { MoreThanOrEqual } from 'typeorm';
import { CustomNotFoundException } from '../../shared/exceptions/http-exception';
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

  async validate(code: string, email: string) {
    const validCode = await this.verificationCodeRepository.findOne({
      where: {
        code,
        email,
        expiresAt: MoreThanOrEqual(new Date()),
        isUsed: false,
      },
    });

    if (!validCode) {
      throw new CustomNotFoundException({
        code: 'invalid-or-expired-code',
        message: 'This code is invalid or has expired',
      });
    }

    return {
      valid: true,
      data: {
        code: validCode.code,
        email: validCode.email,
        expiresAt: validCode.expiresAt,
      },
    };
  }

  async generate() {
    const code = Math.floor(100000 + Math.random() * 900000);

    return code.toString();
  }
}
