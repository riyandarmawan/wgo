import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors
  app.enableCors();

  // validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // filters
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  // interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
