import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateAdminDto {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  oldUser: string

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  newUser: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string
}
