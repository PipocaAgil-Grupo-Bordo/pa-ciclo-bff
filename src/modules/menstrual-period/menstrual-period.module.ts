import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../../shared/services/email/email.module';
import { EncryptionModule } from '../../shared/services/encryption/encryption.module';
import { MenstrualPeriod } from './entities/menstrual-period.entity';
import { MenstrualPeriodController } from './menstrual-period.controller';
import { MenstrualPeriodRepository } from './menstrual-period.repository';
import { MenstrualPeriodService } from './menstrual-period.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenstrualPeriod]),
    EncryptionModule,
    EmailModule,
  ],
  exports: [MenstrualPeriodService],
  controllers: [MenstrualPeriodController],
  providers: [MenstrualPeriodService, MenstrualPeriodRepository],
})
export class MenstrualPeriodModule {}
