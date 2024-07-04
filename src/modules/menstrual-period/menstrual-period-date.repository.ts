import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MenstrualPeriodDate } from './entities/menstrual-period-date.entity';
import { MenstrualPeriodRepository } from './menstrual-period.repository';

@Injectable()
export class MenstrualPeriodDateRepository extends Repository<MenstrualPeriodDate> {
  constructor(
    private dataSource: DataSource,
    private menstrualPeriodRepository: MenstrualPeriodRepository,
  ) {
    super(MenstrualPeriodDate, dataSource.createEntityManager());
  }

  async insertDate(periodDate: { date: string; menstrualPeriodId: number }) {
    const queryRunner = this.dataSource
      .createEntityManager()
      .connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const newMenstrualPeriodDate = await this.save(periodDate);

      await this.menstrualPeriodRepository.update(
        periodDate.menstrualPeriodId,
        {
          lastDate: this.toLocalDate(new Date(periodDate.date)),
        },
      );

      await queryRunner.commitTransaction();
      return newMenstrualPeriodDate;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  toLocalDate(date: Date) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  }
}
