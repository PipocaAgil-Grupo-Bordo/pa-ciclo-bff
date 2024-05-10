import { Injectable } from '@nestjs/common';
import { CreateMenstrualPeriodDto } from './dtos/create-menstrual-period.dto';
import { MenstrualPeriod } from './entities/menstrual-period.entity';
import { MenstrualPeriodRepository } from './menstrual-period.repository';

@Injectable()
export class MenstrualPeriodService {
  constructor(private menstrualPeriodRepository: MenstrualPeriodRepository) {}

  async create(body: CreateMenstrualPeriodDto, userId: number) {
    const menstrualPeriod = { ...body, userId };
    return this.menstrualPeriodRepository.save(menstrualPeriod);
  }

  async getLastMenstrualPeriod(): Promise<MenstrualPeriod | undefined> {
    return await this.menstrualPeriodRepository.getLastMenstrualPeriod();
  }
}
