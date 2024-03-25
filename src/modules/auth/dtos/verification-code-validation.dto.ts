import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerificationCodeValidationDto {
  @IsNotEmpty()
  @IsString()
  @Length(6)
  code: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
