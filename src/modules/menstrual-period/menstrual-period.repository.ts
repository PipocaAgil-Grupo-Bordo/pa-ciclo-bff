import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MenstrualPeriod } from './entities/menstrual-period.entity';

@Injectable()
export class MenstrualPeriodRepository extends Repository<MenstrualPeriod> {
  constructor(private dataSource: DataSource) {
    super(MenstrualPeriod, dataSource.createEntityManager());
  }

  async getLastMenstrualPeriod(): Promise<MenstrualPeriod | undefined> {
    return await this.createQueryBuilder('menstrual_period')
      .orderBy('menstrual_period.date', 'DESC')
      .getOne();
  }
}
