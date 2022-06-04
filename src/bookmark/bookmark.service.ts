import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getAllBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
    return bookmarks;
  }
  async createBookmark(userId: number, dto: any) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    // delete bookmark.user;
    return bookmark;
  }

  async getBookmark(bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
      },
    });
  }
  async updateBookmark(userId: number, id: number, dto: BookmarkDto) {
    console.log(id);
    const bookmark = await this.prisma.bookmark.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
      },
    });
    if (!bookmark || userId !== bookmark.userId)
      throw new ForbiddenException('You are not allowed to edit this bookmark');

    return bookmark;
  }
}
