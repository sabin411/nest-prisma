import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

// constants
const APP_VERSION = 'v1';
const APP_ACCESS_TOKEN = 'access_token';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //  👇 apply transform to all responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Setup Swagger
  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Prisma_Node')
        .setDescription('Node running Prisma API Service')
        .setVersion(APP_VERSION)
        .addCookieAuth(APP_ACCESS_TOKEN)
        .build(),
    ),
  );
  // setup swagger ends
  await app.listen(3001);
}
bootstrap();
