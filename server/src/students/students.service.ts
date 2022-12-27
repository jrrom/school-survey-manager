import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  
  async create(createStudentDto: CreateStudentDto) {
    return await this.studentRepository.findOneByOrFail({'id': createStudentDto.id})
      .then((response) => {
          throw new HttpException("Admin already exists", HttpStatus.BAD_REQUEST);
        })
      .catch((err) => {
        const student = this.studentRepository.create(createStudentDto);
        return this.studentRepository.save(student);
      })
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find().catch((err) => { throw err });
  }

  async findOne(id: string) {
    return await this.studentRepository.findOneByOrFail({'id': id }).catch((err) => {
      throw new HttpException('Unable to find user.', HttpStatus.NOT_FOUND);
    });
  }

  async update(updateStudentDto: UpdateStudentDto) {
    return await this
    // Implement OLD ID and new ID
      .studentRepository.findOneByOrFail({'id': updateStudentDto.oldId}).catch((err) => {
        throw new HttpException('Unable to find user.', HttpStatus.NOT_FOUND);
      })
      .then((response) =>
        {
          return this.studentRepository.update({
            'id': response.id
          }, {
            'id': updateStudentDto.newId,
            'name': updateStudentDto.name,
            'class_': updateStudentDto.class_,
            'section': updateStudentDto.section
          }).then((response) => {
            return this.findOne(updateStudentDto.newId);
          }).catch((err) => {
            throw err;
          })
        }
      ).catch((err) =>
        { throw new HttpException('Unable to find user.', HttpStatus.NOT_FOUND); });
  }

  async remove(ids: string[]) {
    return await this.studentRepository.delete(ids).catch((err) => { throw err });
  }
}
