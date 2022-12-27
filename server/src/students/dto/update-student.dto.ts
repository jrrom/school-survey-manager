import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsString, Length, NotContains } from "class-validator"

export class UpdateStudentDto {
  @IsString()
  @Length(1, 30)
  @NotContains(" ")
  oldId: string

  @IsString()
  @Length(1, 30)
  @NotContains(" ")
  newId: string

  @IsString()
  @Length(1, 64)
  name: string

  @IsString()
  @Length(1, 8)
  @NotContains(" ")
  class_: string

  @IsString()
  @Length(1, 8)
  @NotContains(" ")
  section: string
}