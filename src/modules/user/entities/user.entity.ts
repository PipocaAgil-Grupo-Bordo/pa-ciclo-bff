import { Column, Entity, OneToMany } from 'typeorm';
import { IdTimestampBaseEntity } from '../../../shared/common/id-timestamp.base-entity';
import { MenstrualPeriod } from '../../menstrual-period/entities/menstrual-period.entity';

@Entity()
export class User extends IdTimestampBaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @OneToMany(() => MenstrualPeriod, (menstrualPeriod) => menstrualPeriod.user)
  menstrualPeriods: MenstrualPeriod[];
}
