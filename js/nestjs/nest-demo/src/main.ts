import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  // The create() method returns an application object, which fulfills the INestApplication interface
  // use express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // use global filter
  // app.useGlobalFilters(new HttpExceptionFilter());

  // use fastify
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter()
  // );
  await app.listen(3000);
}
bootstrap();
