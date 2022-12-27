import { IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateSurveyDto{
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  value: string
}