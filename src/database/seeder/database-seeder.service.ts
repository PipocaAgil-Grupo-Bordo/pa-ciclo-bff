import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    this.seedUser();
  }

  async seedUser() {
    const newUser = {
      firstName: 'Mary',
      lastName: 'Jane',
      email: 'mary@jane.com',
      password: 'Mary@jane1234',
    };

    const existingUser = await this.userService.findByEmail(newUser.email);

    if (!existingUser) {
      this.userService.create(newUser);
    }
  }
}