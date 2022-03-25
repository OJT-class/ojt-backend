import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './filters/http-exceptions';

async function bootstrap() {
  // add cors 
  const app = await NestFactory.create(AppModule,{cors:true});
  app.useGlobalFilters(
    // handel with http Exceptions
    new HttpExceptionFilter()

  ),
  await app.listen(8080);
}
bootstrap();
