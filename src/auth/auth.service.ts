import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserInterface } from './auth.interfaces';
import { User, Bookmark } from '@prisma/client';
// import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(user: UserInterface) {
    try {
      // check if user exists
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (userExists) {
        throw new ForbiddenException('User already exists');
      }

      // generate new password
      console.log(user.password);
      const hash = await argon.hash(user.password);
      console.log(hash);
      // user to db
      const newUser = await this.prisma.user.create({
        data: {
          email: user.email,
          password: hash,
          firstName: user.username,
          lastName: user.username,
          name: user.username,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt: true,
        // },
      });
      delete user.password;
      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      throw error;
    }
  }
  async signIn(user: UserInterface): Promise<any> {
    try {
      // find user by email
      const newUser = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      // throw exception if user not exists
      if (!newUser) {
        throw new ForbiddenException('Credentials are wrong');
      }
      // compare password
      const isValid = await argon.verify(newUser.password, user.password);

      if (!isValid) {
        throw new ForbiddenException('Credentials are wrong');
      }
      delete user.password;
      // return user
      return {
        user: newUser,
        access_token: await this.signToken(newUser.id, newUser.email),
      };
    } catch (error) {
      throw error;
    }
  }
  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return token;
  }
}
