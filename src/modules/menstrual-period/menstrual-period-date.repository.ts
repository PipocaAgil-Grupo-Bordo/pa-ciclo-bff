import { Injectable } from '@nestjs/common';
import { parseISO } from 'date-fns';
import { DataSource, Repository } from 'typeorm';
import { MenstrualPeriodDate } from './entities/menstrual-period-date.entity';
import { MenstrualPeriodRepository } from './menstrual-period.repository';

@Injectable()
export class MenstrualPeriodDateRepository extends Repository<MenstrualPeriodDate> {
    constructor(
        private dataSource: DataSource,
        private menstrualPeriodRepository: MenstrualPeriodRepository,
    ) {
        super(MenstrualPeriodDate, dataSource.createEntityManager());
    }

    async insertDate(periodDate: { date: string; menstrualPeriodId: number }) {
        const queryRunner = this.dataSource.createEntityManager().connection.createQueryRunner();

        await queryRunner.startTransaction();

        try {
            const newMenstrualPeriodDate = await this.save(periodDate);

            await this.menstrualPeriodRepository.update(periodDate.menstrualPeriodId, {
                lastDate: parseISO(periodDate.date),
            });

            await queryRunner.commitTransaction();
            return newMenstrualPeriodDate;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async findByPeriodIdAndDate(menstrualPeriodId: number, date: Date) {
        return this.createQueryBuilder('menstrual_period_date')
            .where('menstrual_period_date.menstrualPeriodId = :menstrualPeriodId', {
                menstrualPeriodId,
            })
            .andWhere('DATE(menstrual_period_date.date) = DATE(:date)', {
                date: date.toISOString().split('T')[0],
            })
            .getOne();
    }
}
