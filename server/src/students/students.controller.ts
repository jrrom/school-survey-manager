import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(updateStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() deleteStudentDto: DeleteStudentDto) {
    return this.studentsService.remove(deleteStudentDto.ids);
  }
}
