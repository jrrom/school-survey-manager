import { IsNotEmpty } from "class-validator";

export class DeleteStudentDto {

  @IsNotEmpty()
  ids: string[]
}