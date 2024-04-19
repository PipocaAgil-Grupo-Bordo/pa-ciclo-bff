import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProfiledDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  height: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  weight: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isMenstrualCycleRegular: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  menstrualCycleDuration: number;
}
