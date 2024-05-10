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

  async getLastByUserId(userId: number): Promise<MenstrualPeriod | undefined> {
    return this.menstrualPeriodRepository.getLastMenstrualPeriod(userId);
  }
}
