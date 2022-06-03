import { Injectable } from '@nestjs/common';
import { UserInterface } from './auth.interfaces';

@Injectable()
export class AuthService {
  signUp(user: UserInterface): UserInterface {
    return {
      id: 1,
      username: 'test',
      //   user: {
      // id: 1,
      // username: 'test',
      //   },
      //   token: 'test-token',
    };
  }
  signIn(user: UserInterface): UserInterface {
    return {
      id: 1,
    };
  }
}
