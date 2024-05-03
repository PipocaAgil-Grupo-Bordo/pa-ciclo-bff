import { Body, Controller, Patch, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  upsert(@Request() req, @Body() body: UpdateProfileDto) {
    const user = req.user;
    return this.profileService.upsert(body, user.id);
  }
}
