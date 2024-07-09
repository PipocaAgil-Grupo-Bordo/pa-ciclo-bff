import { Column, Entity, ManyToOne } from 'typeorm';
import { IdTimestampBaseEntity } from '../../../shared/common/id-timestamp.base-entity';
import { MenstrualPeriod } from './menstrual-period.entity';

@Entity()
export class MenstrualPeriodDate extends IdTimestampBaseEntity {
    @Column({ type: 'date' })
    date: Date;

    @Column()
    menstrualPeriodId: number;

    @ManyToOne(() => MenstrualPeriod, (menstrualPeriod) => menstrualPeriod.dates)
    menstrualPeriod: MenstrualPeriod;
}
