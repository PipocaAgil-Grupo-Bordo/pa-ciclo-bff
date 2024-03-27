import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsPasswordStrong } from './password-strength.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsPasswordStrong()
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  birthdate?: string;
}
