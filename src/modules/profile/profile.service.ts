import { Injectable } from '@nestjs/common';
import { CustomBadRequestException } from '../../shared/exceptions/http-exception';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async create(profile: CreateProfileDto) {
    return this.profileRepository.save(profile);
  }

  async upsert(body: UpdateProfileDto, userId: number) {
    const profile = { ...body, userId };

    if (
      profile.isMenstrualCycleRegular &&
      (profile.menstrualCycleDuration < 21 ||
        profile.menstrualCycleDuration > 35)
    ) {
      throw new CustomBadRequestException({
        code: 'invalid-cycle-duration',
        message: 'A regular cycle should last 21 to 35 days',
      });
    }

    if (
      !profile.isMenstrualCycleRegular &&
      (profile.menstrualCycleDuration < 7 ||
        profile.menstrualCycleDuration > 120)
    ) {
      throw new CustomBadRequestException({
        code: 'invalid-cycle-duration',
        message: 'An irregular cycle should last 7 to 120 days',
      });
    }

    const response = await this.profileRepository.upsert(profile, ['userId']);

    return { profileId: response.identifiers[0].id };
  }

  async findOne(userId: number) {
    const profile = await this.profileRepository.findOne({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}
