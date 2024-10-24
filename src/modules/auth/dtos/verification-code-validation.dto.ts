import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerificationCodeValidationDto {
    @IsNotEmpty()
    @IsString()
    @Length(6, 6, { message: 'Verification code must be 6 characters long' })
    code: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
