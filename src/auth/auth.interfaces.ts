import { IsEmail, IsNotEmpty, IsString, IS_EMPTY } from 'class-validator';
export class UserInterface {
  id?: number;
  @IsString()
  // @IS_EMPTY()
  username?: string;
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  password?: string;
}
export interface userReturn {
  user: UserInterface;
  token: string;
}
