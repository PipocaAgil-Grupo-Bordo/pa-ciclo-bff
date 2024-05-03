import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateProfileDto {
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
}
