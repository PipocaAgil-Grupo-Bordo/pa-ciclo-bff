import { Injectable } from '@nestjs/common';
import { CreateMenstrualPeriodDto } from './dtos/create-menstrual-period.dto';
import { MenstrualPeriodRepository } from './menstrual-period.repository';

@Injectable()
export class MenstrualPeriodService {
  constructor(private menstrualPeriodRepository: MenstrualPeriodRepository) {}

  async create(menstrualPeriod: CreateMenstrualPeriodDto) {
    return this.menstrualPeriodRepository.save(menstrualPeriod);
  }
}
