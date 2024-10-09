import { Column, Entity } from 'typeorm';
import { IdTimestampBaseEntity } from '../../../shared/common/id-timestamp.base-entity';

@Entity()
export class VerificationCode extends IdTimestampBaseEntity {
    @Column()
    code: string;

    @Column()
    email: string;

    @Column()
    expiresAt: Date;

    @Column({ default: false })
    isUsed: boolean;
}
