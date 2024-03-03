import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
// import { EncryptionService } from 'src/shared/services/encryption/encryption.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    // private encryptionService: EncryptionService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  create(user: CreateUserDto) {
    // const { password } = user;

    // const hashedPassword = this.encryptionService.hashSync(password);
    // user.password = hashedPassword;

    return this.userRepository.save(user);
  }
}
