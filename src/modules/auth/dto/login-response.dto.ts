import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };

  @ApiProperty()
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
