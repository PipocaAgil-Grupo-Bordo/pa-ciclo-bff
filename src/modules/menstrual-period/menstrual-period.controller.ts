import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMenstrualPeriodDateDto } from './dtos/create-menstrual-date.dto';
import { CreateMenstrualPeriodDto } from './dtos/create-menstrual-period.dto';
import { MenstrualPeriodService } from './menstrual-period.service';

@Controller('menstrual-period')
export class MenstrualPeriodController {
  constructor(
    private readonly menstrualPeriodService: MenstrualPeriodService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req: any, @Body() body: CreateMenstrualPeriodDto) {
    const user = req.user;
    return this.menstrualPeriodService.create(body, user.id);
  }

  @Get('last')
  @UseGuards(AuthGuard('jwt'))
  async getLastMenstrualPeriod(@Request() req: any) {
    const user = req.user;
    const lastPeriod = await this.menstrualPeriodService.getLastByUserId(
      user.id,
    );
    return lastPeriod;
  }

  @Post('date')
  @UseGuards(AuthGuard('jwt'))
  createDate(@Request() req: any, @Body() body: CreateMenstrualPeriodDateDto) {
    const user = req.user;
    return this.menstrualPeriodService.createDate(body, user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteDate(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    const user = req.user;
    return this.menstrualPeriodService.deleteDate(id, user.id);
  }
}
