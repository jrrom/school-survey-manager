import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs'; 
import { Student } from 'src/students/entities/student.entity';
const util = require('util');
const readFile = util.promisify(fs.readFile);
import { DataSource, Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SubmitSurveyDto } from './dto/submit-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Option } from './entities/option.entity';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Option) private optionRepository: Repository<Option>
  ) {}

  async create(createSurveyDto: CreateSurveyDto) {
    let survey  = this.surveyRepository.create(createSurveyDto);
    await this.surveyRepository.save(survey);
    let object = JSON.parse(createSurveyDto.value);
    // Add options to database
    //@ts-ignore
    object.itemList.map(
      (x: any) => x.options.map((y: any) => ({id: y.id, value: 0})
    ))
    .flatMap((z: any) => z)
    .map((x: any) => 
    { 
      let section = object.itemList.filter(
        (a: any, b: any) => a.options.some((c: any) => c.id === x.id)  
      )[0];

      let optionName: string  = section.options.filter((f: any, g: any) => {
        return f.id === x.id;
      })[0].value;

      let newOption: Option = this.optionRepository.create({
         "id": x.id, 
         "section": section.title, 
         "survey": {}, 
         "title": optionName, 
         "type": section.type,
         "value": x.value 
        }) as unknown as Option;
      newOption.survey = survey;
      this.optionRepository.save(newOption); 
    });
  }

  async submit(submitSurveyDto: SubmitSurveyDto) {
    let surveys: Survey[] = await this.surveyRepository.find({ relations: { students: true }}).then(res => res).catch((err) => {
      throw new HttpException('Survey is invalid', HttpStatus.UNAUTHORIZED);
    });

    let student: Student  = await this.studentRepository.findOneByOrFail({ id: submitSurveyDto.studentId }).then(res => res).catch((err) => {
      throw new HttpException('Your I.D is invalid', HttpStatus.UNAUTHORIZED);
    });

    let survey = surveys.filter((x, y) => {
      if (x.id === submitSurveyDto.surveyId) {
        return x
      }
    })[0];

    // CHeck if student voted before

    if (!survey.students) {
      submitSurveyDto.optionIds.map(x => this.incrementOption(x));
      survey.students = [student];
      this.surveyRepository.save(survey);
    } else if (survey.students.some(student => student.id === submitSurveyDto.studentId)) {
      throw new HttpException('You have already voted', HttpStatus.UNAUTHORIZED);
    } else {
      submitSurveyDto.optionIds.map(x => this.incrementOption(x));
      survey.students.push(student);
      this.surveyRepository.save(survey);
    }
  }

  async findAll() {
    return await this.surveyRepository.find().catch((err) => { throw err });
  }

  async userGet(id: string) {
    return await this.surveyRepository.findOneByOrFail({'id': id }).then(res => res).catch((err) => {
      throw new HttpException('Unable to find survey.', HttpStatus.NOT_FOUND);
    });
  }

  async remove(ids: string[]) {
    await this.optionRepository.delete(ids).catch((err) => { throw err })
    return await this.surveyRepository.delete(ids).catch((err) => { throw err });
  }

  async getOptions(id: string) {
    return (await this.optionRepository.find({ relations: { survey: true }}).catch((err) => { throw err })).filter((x, y) => {
      if (x.survey.id === id){
        return x;
      };
    })
  }

  // TEST!!!
  async incrementOption(id: string) {
    return await this.optionRepository.increment({ id: id }, "value", 1);
  }
}