import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MenstrualPeriod } from './entities/menstrual-period.entity';

@Injectable()
export class MenstrualPeriodRepository extends Repository<MenstrualPeriod> {
    constructor(private dataSource: DataSource) {
        super(MenstrualPeriod, dataSource.createEntityManager());
    }

    async getMenstrualPeriods(
        userId: number,
        year: string,
        month?: string,
    ): Promise<MenstrualPeriod[]> {
        if (!month) {
            return this.createQueryBuilder('menstrual_period')
                .leftJoinAndSelect('menstrual_period.dates', 'dates')
                .where('menstrual_period.userId = :userId', { userId })
                .andWhere('EXTRACT(YEAR FROM menstrual_period.startedAt) = :year', { year })
                .orderBy('menstrual_period.startedAt', 'ASC')
                .addOrderBy('dates.date', 'ASC')
                .getMany();
        }

        return this.createQueryBuilder('menstrual_period')
            .leftJoinAndSelect('menstrual_period.dates', 'dates')
            .where('menstrual_period.userId = :userId', { userId })
            .andWhere('EXTRACT(YEAR FROM menstrual_period.startedAt) = :year', { year })
            .andWhere('EXTRACT(MONTH FROM menstrual_period.startedAt) = :month', { month })
            .orderBy('menstrual_period.startedAt', 'ASC')
            .addOrderBy('dates.date', 'ASC')
            .getMany();
    }

    async getLastMenstrualPeriod(userId: number): Promise<MenstrualPeriod | undefined> {
        return this.createQueryBuilder('menstrual_period')
            .where('menstrual_period.userId = :userId', { userId })
            .orderBy('menstrual_period.startedAt', 'DESC')
            .getOne();
    }

    findClosestPeriod(date: string, userId: number, direction: 'past' | 'future' = 'past') {
        const comparingDate = new Date(date);

        if (direction === 'past') {
            return this.createQueryBuilder('menstrual_period')
                .where('menstrual_period.userId = :userId', { userId })
                .andWhere('menstrual_period.lastDate <= :comparingDate', { comparingDate })
                .orderBy('menstrual_period.lastDate', 'DESC')
                .getOne();
        }

        if (direction === 'future') {
            return this.createQueryBuilder('menstrual_period')
                .where('menstrual_period.userId = :userId', { userId })
                .andWhere('menstrual_period.startedAt >= :comparingDate', { comparingDate })
                .orderBy('menstrual_period.lastDate', 'ASC')
                .getOne();
        }
    }
}
