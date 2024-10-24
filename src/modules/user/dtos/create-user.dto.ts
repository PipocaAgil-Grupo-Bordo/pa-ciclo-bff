import { IsDateString, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { LettersOnly } from '../../../shared/decorators/letters-only.decorator';
import { IsPasswordStrong } from '../../../shared/decorators/password-strength.decorator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(15)
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
