import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CreateUserDto } from '../src/modules/user/dtos/create-user.dto';
import { UserModule } from '../src/modules/user/user.module';
import { UserService } from '../src/modules/user/user.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const userService = {
    create: jest.fn().mockImplementation((dto: CreateUserDto) => ({
      id: Date.now(),
      ...dto,
    })),
    findAll: jest.fn().mockImplementation(() => [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ]),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule], // Import your UserModule
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) should create a user', () => {
    const userDto: CreateUserDto = { name: 'Test User', email: 'test@example.com', password: 'Test123456', birthdate: '1994-06-05' };

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
