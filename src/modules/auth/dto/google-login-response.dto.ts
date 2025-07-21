import { User } from "src/modules/users/users.entity";

export class GoogleLoginResponseDto {
  token: string;
  user: User;
}