import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPasswordStrong } from './password-strength.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPasswordStrong()
  password: string;
}
