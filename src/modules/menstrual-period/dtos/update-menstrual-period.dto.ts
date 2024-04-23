import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateMenstrualPeriodDto {
  @IsNotEmpty()
  @IsDateString()
  startedAt: string;
}
