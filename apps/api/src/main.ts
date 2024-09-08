import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  app.enableCors({ credentials: true, origin: 'http://localhost:4200' });
  app.use(cookieParser());
  const api = '/api';
  // app.useWebSocketAdapter(new AuthIoAdapter(app));
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', '..', '..', 'views'));
  app.setGlobalPrefix('api');
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}${api}`);
}

bootstrap();
