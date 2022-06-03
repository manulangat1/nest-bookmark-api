import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller()
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  @Get('/cats')
  getCats(): string {
    return 'Hello worlds, i am your cats!';
  }
}
