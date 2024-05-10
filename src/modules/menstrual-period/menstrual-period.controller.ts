import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomNotFoundException } from '../../shared/exceptions/http-exception';
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
    if (!lastPeriod) {
      throw new CustomNotFoundException({
        code: 'not-found',
        message: 'None found',
      });
    }
    return lastPeriod;
  }
}
