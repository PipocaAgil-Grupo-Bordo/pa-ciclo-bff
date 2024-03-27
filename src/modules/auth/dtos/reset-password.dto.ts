import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsPasswordStrong } from '../../user/dtos/password-strength.decorator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6, { message: 'Verification code must be 6 characters long' })
  code: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPasswordStrong()
  password: string;
}
