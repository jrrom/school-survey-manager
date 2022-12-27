import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity'
import { Survey } from './entities/survey.entity'
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Option, Student])],
  controllers: [SurveysController],
  providers: [SurveysService],
  exports: [SurveysService]
})
export class SurveysModule {}
