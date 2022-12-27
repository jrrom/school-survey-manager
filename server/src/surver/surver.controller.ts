import { Controller, Get, Inject, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from 'src/surveys/entities/survey.entity';
import { SurveysService } from 'src/surveys/surveys.service';
import { Repository } from 'typeorm';

@Controller('surver')
export class SurverController {
  constructor(
    @Inject(SurveysService)
    private readonly surveysService: SurveysService,
  ){}

  @Get(':id')
  getSurvey(@Param('id') id: string) {
    return this.surveysService.userGet(id);
  }
}
