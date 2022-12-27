import { IsNotEmpty } from "class-validator"

export class SubmitSurveyDto {
  @IsNotEmpty()
  surveyId: string

  @IsNotEmpty()
  optionIds: string[]

  @IsNotEmpty()
  studentId: string
}