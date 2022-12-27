import { IsNotEmpty } from "class-validator";

export class DeleteSurveyDto {

  @IsNotEmpty()
  ids: string[]
}