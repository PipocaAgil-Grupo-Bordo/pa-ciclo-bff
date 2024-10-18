import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProfileDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    height?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isMenstrualCycleRegular?: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    menstrualCycleDuration?: number;

    @IsOptional()
    @IsDateString()
    initialPeriodDate?: string;
}
