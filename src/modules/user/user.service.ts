import { Injectable } from '@nestjs/common';
import { CustomConflictException } from '../../shared/exceptions/http-exception';
import { EncryptionService } from '../../shared/services/encryption/encryption.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private encryptionService: EncryptionService,
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

  async create(user: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      throw new CustomConflictException({
        code: 'email-already-registered',
        message: 'This email is already registered',
      });
    }

    const { password } = user;

    const hashedPassword = this.encryptionService.hashSync(password);
    user.password = hashedPassword;

    const newUser = await this.userRepository.save(user);

    delete newUser.password;

    return newUser;
  }
}
