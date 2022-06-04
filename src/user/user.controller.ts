import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
@Controller('api/v1/profile')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  getProfile(@GetUser() user: User) {
    console.log({
      user: user.email,
    });
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  editUser(@GetUser('id') user: any, @Body() dto: EditUserDto) {
    const { sub } = user;
    console.log(sub, dto);
    return this.userService.editUser(sub, dto);
  }
}
