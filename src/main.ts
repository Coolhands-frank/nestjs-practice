import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips properties not in DTO
    forbidNonWhitelisted: true, // (optional) throws an error for extra fields
    transform: true, // auto-transform payloads to DTO instances
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
