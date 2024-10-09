import { IsDateString, IsNotEmpty } from 'class-validator';
import { IsNotFutureDate } from '../../../shared/decorators/future-dates-not-allowed.decorator';

export class CreateMenstrualPeriodDto {
    @IsNotEmpty()
    @IsDateString()
    @IsNotFutureDate()
    startedAt: string;
}
