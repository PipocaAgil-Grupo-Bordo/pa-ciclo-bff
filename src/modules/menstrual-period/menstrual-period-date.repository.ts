import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MenstrualPeriodDate } from './entities/menstrual-period-date.entity';

@Injectable()
export class MenstrualPeriodDateRepository extends Repository<MenstrualPeriodDate> {
  constructor(private dataSource: DataSource) {
    super(MenstrualPeriodDate, dataSource.createEntityManager());
  }
}
