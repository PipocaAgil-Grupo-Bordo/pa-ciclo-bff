import { Injectable } from '@nestjs/common';
import { CreateMenstrualPeriodDto } from './dtos/create-menstrual-period.dto';
import { MenstrualPeriod } from './entities/menstrual-period.entity';
import { MenstrualPeriodRepository } from './menstrual-period.repository';

@Injectable()
export class MenstrualPeriodService {
  constructor(private menstrualPeriodRepository: MenstrualPeriodRepository) {}

  async create(body: CreateMenstrualPeriodDto, userId: number) {
    return this.menstrualPeriodRepository.saveMenstrualPeriod(body, userId);
  }

  async getLastPeriod(userId: number): Promise<MenstrualPeriod> {
    return this.menstrualPeriodRepository.findLastPeriod(userId);
  }
}
