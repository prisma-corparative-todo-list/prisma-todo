import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { AuthIoAdapter } from './chat/adapters/auth.adapter';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
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
