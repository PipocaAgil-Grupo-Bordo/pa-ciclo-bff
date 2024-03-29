import { IsNotEmpty, IsString } from 'class-validator';
import { IsPasswordStrong } from '../../user/dtos/password-strength.decorator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsPasswordStrong()
  password: string;
}
