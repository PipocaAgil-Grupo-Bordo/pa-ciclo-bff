import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateMenstrualPeriodDto {
  @IsNotEmpty()
  @IsDateString()
  startedAt: string;
}
