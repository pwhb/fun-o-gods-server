import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  GenericExceptionFilter,
  validationExceptionHandler,
} from './utils/exceptions';
import { DevInterceptor } from './utils/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: validationExceptionHandler,
    }),
  );
  app.useGlobalFilters(new GenericExceptionFilter());
  // app.useGlobalInterceptors(new DevInterceptor)
  await app.listen(process.env.PORT);
}
bootstrap();
