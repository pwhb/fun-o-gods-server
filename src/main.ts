import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import
  {
    GenericExceptionFilter,
    validationExceptionHandler,
  } from './lib/exceptions';
import { DevInterceptor } from './lib/interceptors';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule);
  const swaggerConf = new DocumentBuilder()
    .setTitle('FOG API')
    .setDescription('FOG API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs/swagger.json'
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: validationExceptionHandler,
    }),
  );
  app.useGlobalFilters(new GenericExceptionFilter());
  app.useGlobalInterceptors(new DevInterceptor());
  await app.listen(configService.get('PORT'));
}
bootstrap();
