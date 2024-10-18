import { Column, Entity, OneToOne } from 'typeorm';
import { IdTimestampBaseEntity } from '../../../shared/common/id-timestamp.base-entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Profile extends IdTimestampBaseEntity {
    @Column({ type: 'integer', nullable: true })
    height?: number;

    @Column({ type: 'double precision', nullable: true })
    weight?: number;

    @Column({ default: true })
    isMenstrualCycleRegular?: boolean;

    @Column({ nullable: true })
    menstrualCycleDuration?: number;

    @Column({ type: 'date', nullable: true })
    initialPeriodDate: Date;

    @Column({ unique: true })
    userId: number;

    @OneToOne(() => User)
    user: User;
}
