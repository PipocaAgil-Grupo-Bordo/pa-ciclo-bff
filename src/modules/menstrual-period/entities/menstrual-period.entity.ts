import { Column, Entity, ManyToOne } from 'typeorm';
import { IdTimestampBaseEntity } from '../../../shared/common/id-timestamp.base-entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class MenstrualPeriod extends IdTimestampBaseEntity {
  @Column({ type: 'date', nullable: true })
  startedAt?: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.menstrualPeriods)
  user: User;
}
