import { Module } from '@nestjs/common';
import { SurveysService } from '../surveys/surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from '../surveys/entities/option.entity'
import { Survey } from '../surveys/entities/survey.entity'
import { SurverController } from './surver.controller';
import { SurveysModule } from 'src/surveys/surveys.module';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Option]), SurveysModule],
  controllers: [SurverController],
})
export class SurverModule {}

