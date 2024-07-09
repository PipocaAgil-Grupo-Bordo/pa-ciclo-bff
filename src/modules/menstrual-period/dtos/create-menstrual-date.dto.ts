import { IsDateString, IsNotEmpty } from 'class-validator';
import { IsNotFutureDate } from '../../../shared/decorators/future-dates-not-allowed.decorator';

export class CreateMenstrualPeriodDateDto {
  @IsNotEmpty()
  @IsDateString()
  @IsNotFutureDate()
  date: string;
}
