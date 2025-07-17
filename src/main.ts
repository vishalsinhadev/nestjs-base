import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { NotFoundFilter } from './common/filters/notfound.filter';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(json()); 
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new NotFoundFilter());
  
  TypeOrmModule.forRoot({
    synchronize: false, // 👈 prevents schema overwrite
  });
  const port = process.env.PORT || 3000;
  console.log(app.getHttpServer()._events.request.toString());
  await app.listen(port);
}
bootstrap();
