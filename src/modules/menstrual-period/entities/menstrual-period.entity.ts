import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IdTimestampBaseEntity } from '../../../shared/common/id-timestamp.base-entity';
import { User } from '../../user/entities/user.entity';
import { MenstrualPeriodDate } from './menstrual-period-date.entity';

@Entity()
export class MenstrualPeriod extends IdTimestampBaseEntity {
    @Column({ type: 'date', nullable: true })
    startedAt: Date;

    @Column({ type: 'date', nullable: true })
    lastDate: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.menstrualPeriods)
    user: User;

    @OneToMany(() => MenstrualPeriodDate, (menstrualDate) => menstrualDate.menstrualPeriod)
    dates: MenstrualPeriodDate[];
}
