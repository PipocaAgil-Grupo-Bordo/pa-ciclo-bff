import { IsNotEmpty, IsString } from 'class-validator';
import { IsPasswordStrong } from '../../../shared/decorators/password-strength.decorator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    @IsPasswordStrong()
    password: string;
}
