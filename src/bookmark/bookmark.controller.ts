import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto';

@Controller('/api/v1/bookmarks')
@UseGuards(JwtGuard)
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllBookmarks(@GetUser() user: any, @Body() dto: BookmarkDto) {
    const { sub } = user;
    // return sub;
    return this.bookmarkService.getAllBookmarks(sub);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createBookmark(@GetUser() user: any, @Body() dto: BookmarkDto) {
    const { sub } = user;
    return this.bookmarkService.createBookmark(sub, dto);
  }
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getBookmark(
    @GetUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: BookmarkDto,
  ) {
    return this.bookmarkService.getBookmark(id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('/:id')
  updateBookmark(
    @GetUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: BookmarkDto,
  ) {
    const { sub } = user;
    console.log(dto);
    return this.bookmarkService.updateBookmark(sub, id, dto);
  }
}
