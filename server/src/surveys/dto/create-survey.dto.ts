import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateSurveyDto {
  images: any

  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  value: string
}
