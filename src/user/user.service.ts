import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(userId: number, dto: EditUserDto): Promise<User> {
    const user = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: dto.name,
        firstName: dto.name,
        lastName: dto.name,
      },
    });
    delete (await user).password;
    return user;
  }
}
