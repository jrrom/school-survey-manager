import { IsAlphanumeric, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginAdminDto {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  user: string

  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  password: string
}