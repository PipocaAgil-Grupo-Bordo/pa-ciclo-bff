import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { LettersOnly } from '../../../shared/decorators/letters-only.decorator';
import { IsPasswordStrong } from '../../../shared/decorators/password-strength.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @LettersOnly()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPasswordStrong()
  password: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: string;
}
