import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenstrualPeriodDto } from './dtos/create-menstrual-period.dto';
import { MenstrualPeriod } from './entities/menstrual-period.entity';

@Injectable()
export class MenstrualPeriodRepository {
  constructor(
    @InjectRepository(MenstrualPeriod)
    private readonly repository: Repository<MenstrualPeriod>,
  ) {}

  async saveMenstrualPeriod(
    createMenstrualPeriodDto: CreateMenstrualPeriodDto,
    userId: number,
  ): Promise<MenstrualPeriod> {
    const menstrualPeriod = { ...createMenstrualPeriodDto, userId };
    return this.repository.save(menstrualPeriod);
  }

  async findLastPeriod(userId: number): Promise<MenstrualPeriod | undefined> {
    return this.repository.findOne({
      where: { userId },
      order: { startedAt: 'DESC' },
    });
  }
}
