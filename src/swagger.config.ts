import { DocumentBuilder, ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Ciclo Ágil API')
  .setDescription('Documentação da API do projeto Ciclo Ágil.')
  .setVersion('1.0.0')
  .addBearerAuth()
  .addTag('auth', 'Autenticação de usuários')
  // .addOperation({
  //   path: '/users',
  //   method: 'POST',
  //   operationId: 'createUser',
  //   summary: 'Cria um novo usuário',
  //   requestBody: {
  //     description: 'Dados do novo usuário',
  //     content: {
  //       'application/json': {
  //         schema: {
  //           type: 'object',
  //           properties: {
  //             ...CreateUserDto,
  //           },
  //           example: {
  //             firstName: 'John',
  //             lastName: 'Doe',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   responses: {
  //     '201': {
  //       description: 'Usuário criado com sucesso',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             ...UserResponseDto,
  //           },
  //           example: {
  //             id: 1,
  //             firstName: 'John',
  //             lastName: 'Doe',
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  .build();
