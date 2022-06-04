import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserInterface, userReturn } from './auth.interfaces';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() dto: UserInterface) {
    console.log(dto);
    return this.authService.signUp(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: UserInterface) {
    return this.authService.signIn(dto);
  }
  // @Get('/profile')
  // getProfile(@)
}
