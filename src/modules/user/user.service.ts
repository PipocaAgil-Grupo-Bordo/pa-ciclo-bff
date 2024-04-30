import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CustomConflictException } from '../../shared/exceptions/http-exception';
import { EmailService } from '../../shared/services/email/email.service';
import { EncryptionService } from '../../shared/services/encryption/encryption.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private userRepository: UserRepository,
    private encryptionService: EncryptionService,
    private emailService: EmailService,
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
    user.email = user.email.toLowerCase();

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

    //Figure out later a better way to do this validation

    // const isValidEmail = await this.emailService.isValid(user.email);

    // if (!isValidEmail) {
    //   throw new CustomBadRequestException({
    //     code: 'inexistent-email-address',
    //     message: 'This email address is invalid or does not exist',
    //   });
    // }

    const { password } = user;

    const hashedPassword = this.encryptionService.hashSync(password);
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return this.authService.login({
      email: user.email,
      password,
    });
  }

  async update(id: number, user: UpdateUserDto) {
    if (user.password) {
      const hashedPassword = this.encryptionService.hashSync(user.password);
      user.password = hashedPassword;
    }

    await this.userRepository.update(id, user);

    return {
      message: 'Successfully updated!',
      userId: id,
    };
  }
}
