import { Injectable } from '@nestjs/common';
import { User } from './user/user';

@Injectable()
export class UsuarioService {
  users: User[] = [];

  list(): User[] {
    return this.users;
  }

  findById(id: number): User {
    return this.users.find((user) => user.id === id);
  }
  save(user: User) {
    this.users.push(user);
  }
  update(id: number, userUpdateData: User) {
    this.user.forEach((user) => {
      if (user.id === id) {
        user.name = userUpdateData.name;
        user.email = userUpdateData.email;
      }
    });
  }
}
