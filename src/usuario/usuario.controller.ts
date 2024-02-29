import { Controller, Res, Get, Post, Put, Body, Param } from '@nestjs/common';
import { Response } from 'express';
import { UsuarioService } from './usuario.service';
import { User } from './user/user';

@Controller('usuario')
export class UsuarioController {
  constructor(private service: UsuarioService) {}

  @Get()
  list(@Res() response: Response) {
    const list = this.service.list();
    return response.status(200).send(list);
  }

  @Get('/:id')
  getById(@Param('id') id: number, @Res() response: Response) {
    const user = this.service.findById(id);
    if (!user) {
      return response.status(404).send();
    }
    return response.status(200).send(user);
  }
  @Post()
  save(@Body() user: User, @Res() response: Response) {
    this.service.save(user);
    return response.status(201).send('Usuário salvo com sucesso');
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() userUpdateData: User,
    @Res() response: Response,
  ) {
    const user = this.service.findById(id);
    if (!user) {
      return response.status(404).send();
    }
    this.service.update(id, userUpdateData);
    return response
      .status(204)
      .send(`Usuário: ${id}-${userUpdateData.name} atualizado com sucesso`);
  }
}
