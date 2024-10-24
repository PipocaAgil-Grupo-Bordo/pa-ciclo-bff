import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VerificationCode } from './entities/verification-code.entity';

@Injectable()
export class VerificationCodeRepository extends Repository<VerificationCode> {
    constructor(private dataSource: DataSource) {
        super(VerificationCode, dataSource.createEntityManager());
    }
}
