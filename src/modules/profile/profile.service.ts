import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async create(body: CreateProfileDto) {
    return this.profileRepository.save(body);
  }

  async upsert(body: UpdateProfileDto, userId: number) {
    // const profile = await this.profileRepository.findOne({ where: { userId } });
    const profile = { ...body, userId };

    return this.profileRepository.upsert(profile, ['userId']);
  }
}
