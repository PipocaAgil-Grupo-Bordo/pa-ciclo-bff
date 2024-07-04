import { Injectable } from '@nestjs/common';
import { parseISO } from 'date-fns';
import {
  CustomConflictException,
  CustomNotFoundException,
} from '../../shared/exceptions/http-exception';
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
    let shouldCreateMenstrualPeriod = false;
    let menstrualPeriodId: number;
    const bodyDate = parseISO(body.date);

    const closestPeriod =
      await this.menstrualPeriodRepository.findClosestPeriod(
        bodyDate.toISOString(),
      );

    if (!closestPeriod) {
      shouldCreateMenstrualPeriod = true;
    } else {
      menstrualPeriodId = closestPeriod.id;

      const closestPeriodDate = this.toLocalDate(
        new Date(closestPeriod.lastDate),
      );

      const differenceInTime = bodyDate.getTime() - closestPeriodDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays > 3) {
        shouldCreateMenstrualPeriod = true;
      }
    }

    if (shouldCreateMenstrualPeriod) {
      const newPeriod = await this.menstrualPeriodRepository.save({
        startedAt: now,
        lastDate: now,
        userId,
      });

      menstrualPeriodId = newPeriod.id;
    }

    const existingDate =
      await this.menstrualPeriodDateRepository.findByPeriodIdAndDate(
        menstrualPeriodId,
        bodyDate,
      );

    if (existingDate) {
      throw new CustomConflictException({
        code: 'date-already-added',
        message: 'This date was already added.',
      });
    }

    return this.menstrualPeriodDateRepository.insertDate({
      ...body,
      menstrualPeriodId,
      date: body.date,
    });
  }

  toLocalDate(date: Date) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  }
}
