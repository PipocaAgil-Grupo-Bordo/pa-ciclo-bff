import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VerificationCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  email: string;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  isUsed: boolean;
}
