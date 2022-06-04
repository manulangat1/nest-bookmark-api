import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          //   url: process.env.PRISMA_URL,
          url: config.get('DATABASE_URL'),
          // 'postgresql://postgres:123@localhost:5434/nest?schema=public',
        },
      },
    });
  }
  cleanDB() {
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
