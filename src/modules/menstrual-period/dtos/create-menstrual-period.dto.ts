import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMenstrualPeriodDto {
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  startedAt: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  lastMenstruationDate: string;
}
