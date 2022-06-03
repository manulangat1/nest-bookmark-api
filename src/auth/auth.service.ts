import { Injectable } from '@nestjs/common';
import { UserInterface } from './auth.interfaces';
import { User, Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signUp(user: UserInterface): UserInterface {
    return {
      id: 1,
      username: 'test',
    };
  }
  signIn(user: UserInterface): UserInterface {
    return {
      id: 1,
    };
  }
}
