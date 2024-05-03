import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileService } from './profile.service';

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
