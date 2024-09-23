import { IsDateString, IsNotEmpty } from 'class-validator';
import { IsNotFutureDate } from '../../../shared/decorators/future-dates-not-allowed.decorator';

export class UpdateMenstrualPeriodDto {
    @IsNotEmpty()
    @IsDateString()
    @IsNotFutureDate()
    startedAt: string;
}
//teste
