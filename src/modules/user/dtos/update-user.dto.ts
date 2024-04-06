import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { LettersOnly } from '../../../shared/decorators/letters-only.decorator';
import { IsPasswordStrong } from '../../../shared/decorators/password-strength.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @LettersOnly()
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
