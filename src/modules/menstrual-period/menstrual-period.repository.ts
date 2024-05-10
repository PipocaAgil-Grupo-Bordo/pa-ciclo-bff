import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MenstrualPeriod } from './entities/menstrual-period.entity';

@Injectable()
export class MenstrualPeriodRepository extends Repository<MenstrualPeriod> {
  constructor(private dataSource: DataSource) {
    super(MenstrualPeriod, dataSource.createEntityManager());
  }

  async getLastMenstrualPeriod(
    userId: number,
  ): Promise<MenstrualPeriod | undefined> {
    return await this.createQueryBuilder('menstrual_period')
      .where('menstrual_period.userId = :userId', { userId })
      .orderBy('menstrual_period.startedAt', 'DESC')
      .getOne();
  }
}
