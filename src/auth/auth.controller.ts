import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserInterface, userReturn } from './auth.interfaces';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() dto: UserInterface): UserInterface {
    console.log(dto);
    return this.authService.signUp(dto);
  }
  @Post('/signin')
  signIn(@Body() dto: UserInterface): UserInterface {
    return this.authService.signIn(dto);
  }
  // @Get('/profile')
  // getProfile(@)
}
