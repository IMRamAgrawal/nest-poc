import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Global Validation Pipe with configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes non-whitelisted properties from the request body
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are present
      transform: true, // Automatically transforms request payloads to match the DTO class
    }),
  );

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Auth API')
    .setDescription(
      'API documentation for role-based authentication, user CRUD, and more',
    )
    .setVersion('1.0')
    .addBearerAuth() // Add support for Bearer Token
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
