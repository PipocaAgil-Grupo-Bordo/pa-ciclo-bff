import { Injectable } from '@nestjs/common';
import { CreateMenstrualPeriodDto } from './dtos/create-menstrual-period.dto';
import { MenstrualPeriodRepository } from './menstrual-period.repository';

@Injectable()
export class MenstrualPeriodService {
  constructor(private menstrualPeriodRepository: MenstrualPeriodRepository) {}

  async create(body: CreateMenstrualPeriodDto, userId: number) {
    const menstrualPeriod = { ...body, userId };

    return this.menstrualPeriodRepository.save(menstrualPeriod);
  }
}
