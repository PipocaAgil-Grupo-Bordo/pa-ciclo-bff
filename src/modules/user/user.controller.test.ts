import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DatabaseModule } from '../../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import { VerificationCodeModule } from '../verification-code/verification-code.module';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModule } from './user.module';

describe('UserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
        DatabaseModule,
        UserModule,
        AuthModule,
        VerificationCodeModule,
        ProfileModule,
      ],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) should create a user', () => {
    const userDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test123456',
      birthdate: '1994-06-05',
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(userDto)
      .expect(201)
      .expect({
        id: expect.any(Number),
        ...userDto,
      });
  });

  it('/users (GET) should return an array of users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ]);
  });
});
