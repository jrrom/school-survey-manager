import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAdminDto {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  user: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string
}
