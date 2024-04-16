import { Body, Controller, Post } from '@nestjs/common';
import { CreateMenstrualPeriodDto } from './dtos/create-menstrual-period.dto';
import { MenstrualPeriodService } from './menstrual-period.service';

@Controller('menstrual-period')
export class MenstrualPeriodController {
  constructor(
    private readonly menstrualPeriodService: MenstrualPeriodService,
  ) {}

  @Post()
  create(@Body() createMenstrualPeriodDto: CreateMenstrualPeriodDto) {
    return this.menstrualPeriodService.create(createMenstrualPeriodDto);
  }
}
