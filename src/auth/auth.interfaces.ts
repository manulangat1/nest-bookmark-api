export interface UserInterface {
  id?: number;
  username?: string;
  password?: string;
}
export interface userReturn {
  user: UserInterface;
  token: string;
}
