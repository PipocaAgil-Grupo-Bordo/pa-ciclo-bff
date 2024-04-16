import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateMenstrualPeriodDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  startedAt: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  lastMenstruationDate: string;
}
