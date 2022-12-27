import { IsNotEmpty } from "class-validator";

export class DeleteAdminDto {

  @IsNotEmpty()
  users: string[]
}
