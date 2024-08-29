import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/errors.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  await app.listen(3000);
}
bootstrap();
