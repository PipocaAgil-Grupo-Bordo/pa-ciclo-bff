import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { EncryptionModule } from '../../shared/services/encryption/encryption.module';
import { EmailModule } from '../../shared/services/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncryptionModule, EmailModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
