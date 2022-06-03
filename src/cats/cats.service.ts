import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getHello(): string {
    return 'Hello World! from my first cats app!';
  }
}
