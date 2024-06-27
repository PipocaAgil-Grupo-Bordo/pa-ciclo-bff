import { Injectable } from '@nestjs/common';
import { CustomNotFoundException } from '../../shared/exceptions/http-exception';
import { CreateMenstrualPeriodDateDto } from './dtos/create-menstrual-date.dto';
import { CreateMenstrualPeriodDto } from './dtos/create-menstrual-period.dto';
import { MenstrualPeriod } from './entities/menstrual-period.entity';
import { MenstrualPeriodDateRepository } from './menstrual-period-date.repository';
import { MenstrualPeriodRepository } from './menstrual-period.repository';

@Injectable()
export class MenstrualPeriodService {
  constructor(
    private menstrualPeriodRepository: MenstrualPeriodRepository,
    private menstrualPeriodDateRepository: MenstrualPeriodDateRepository,
  ) {}

  async create(body: CreateMenstrualPeriodDto, userId: number) {
    const menstrualPeriod = { ...body, userId };
    return this.menstrualPeriodRepository.save(menstrualPeriod);
  }

  async getLastByUserId(userId: number): Promise<MenstrualPeriod | undefined> {
    const lastPeriod =
      await this.menstrualPeriodRepository.getLastMenstrualPeriod(userId);
    if (!lastPeriod) {
      throw new CustomNotFoundException({
        code: 'not-found',
        message: 'No menstrual period found for this user',
      });
    }
    return lastPeriod;
  }

  async createDate(body: CreateMenstrualPeriodDateDto, userId: number) {
    const now = new Date();

    const lastPeriod =
      await this.menstrualPeriodRepository.getLastMenstrualPeriod(userId);

    const lastPeriodDate = new Date(lastPeriod.lastDate);
    const differenceInTime = now.getTime() - lastPeriodDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (!lastPeriod || differenceInDays >= 2) {
      const newPeriod = await this.menstrualPeriodRepository.save({
        startedAt: now,
        lastDate: now,
        userId,
      });

      return this.menstrualPeriodDateRepository.save({
        ...body,
        menstrualPeriodId: newPeriod.id,
      });
    }

    return this.menstrualPeriodDateRepository.save({
      ...body,
      menstrualPeriodId: lastPeriod.id,
    });
  }
}
