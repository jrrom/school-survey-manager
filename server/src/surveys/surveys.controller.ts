import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Request, UseGuards, Req } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
const  path = require('path');
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteSurveyDto } from './dto/delete-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SubmitSurveyDto } from './dto/submit-survey.dto';

@Controller('api/surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  uploadFile(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto);
  }

  @Post('submit')
  submitSurvey(@Body() submitSurveyDto: SubmitSurveyDto) {
    return this.surveysService.submit(submitSurveyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('images')
  @UseInterceptors(
    AnyFilesInterceptor(
    { 
        storage: diskStorage({
          destination: './surveys/',
          filename: (req, file, cb) => {
            const filename: string  = path.parse(file.originalname).name.replace(/\s/g, '-');
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
          }
      })
    }))
  uploadImages(@UploadedFiles() images: any, @Req() body: any) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.surveysService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveysService.userGet(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/options')
  findOptions(@Param('id') id: string) {
    return this.surveysService.getOptions(id);
  }


  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() deleteSurveyDto: DeleteSurveyDto) {
    return this.surveysService.remove(deleteSurveyDto.ids);
  }
}