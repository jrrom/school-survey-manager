import { IsNotEmpty, IsString, Length, NotContains } from "class-validator"

export class CreateStudentDto {
  @IsString()
  @Length(1, 30)
  @NotContains(" ")
  @IsNotEmpty()
  id: string

  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  name: string

  @IsString()
  @Length(1, 8)
  @NotContains(" ")
  @IsNotEmpty()
  class_: string

  @IsString()
  @Length(1, 8)
  @NotContains(" ")
  @IsNotEmpty()
  section: string
}