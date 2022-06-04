import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
// import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
describe('App e2e', () => {
  let app: INestApplication;
  // let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: any = {
      email: 'emmanu@gmail.com',
      password: '123456',
      username: 'emmanu',
    };
    describe('Sign up', () => {
      it(' Should  throw an error when email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: '',
            password: '123456',
            username: 'emmanu',
          })
          .expectStatus(400);
      });
      it(' Should  throw an error when password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: '',
            password: '',
            username: 'emmanu',
          })
          .expectStatus(400);
      });
      it('should sign up a new user', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Sign in', () => {
      it(' Should  throw an error when password is wrong', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: '',
            password: '',
            username: 'emmanu',
          })
          .expectStatus(400);
      });
      it(' Should  throw an error when email is wrong', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: 'sd@gmail.com',
            password: '123456',
            username: 'emmanu',
          })
          .expectStatus(403);
      });
      it('should sign in a user', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .inspect()
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get current user', () => {
      it(' Should get a user fail without token', () => {
        return pactum.spec().get('/api/v1/profile').expectStatus(401);
      });
      it(' Should get a user success', () => {
        return pactum
          .spec()
          .get('/api/v1/profile')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Edit user', () => {
      it('Should update a user', () => {
        return pactum
          .spec()
          .patch('/api/v1/profile')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectStatus(200);
      });
    });
  });
  describe('Bookmarks', () => {
    describe('Create bookmark', () => {
      it('Should create a bookmark', () => {
        return pactum
          .spec()
          .post('/api/v1/bookmarks')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .withBody({
            title: 'test',
            description: 'jj',
            link: 'https://www.google.com',
          })
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get bookmark', () => {
      it('Should get a bookmark', () => {
        return pactum
          .spec()
          .get('/api/v1/bookmarks/1')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectStatus(200);
      });
    });
    describe('Get bookmark by id', () => {
      it('Should get a bookmark', () => {
        return pactum
          .spec()
          .get('/api/v1/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}');
      });
    });
    describe('Edit bookmark by id ', () => {
      it('Should update a bookmark', () => {
        return pactum
          .spec()
          .get('/api/v1/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders('Authorization', 'Bearer $S{userAt}')
          .withBody({
            title: 'test hhj',
          })
          .expectStatus(200)
          .inspect();
      });
    });
    // describe('Delete bookmark by id', () => {});
  });
});
