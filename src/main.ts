import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './filters/http-exceptions';

async function bootstrap() {
  // add cors
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(
    // handel with http Exceptions
    new HttpExceptionFilter(),
  ),
    app.useGlobalPipes(
      // to use transform must install package,  npm i class-transformer
      // with pipe Global Pips we Can handel with validate-class package for example
      // if in auth/login the user not provided Email or Password
      // return this object error
      // be attention  IF User is not Email Type It will be return  email must be an email
      //  {
      //      "status": 400,
      //       "createBy": "HttpExceptionFilter",
      //       "message": {
      //         "statusCode": 400,
      //         "message": [
      //             "email must be an email",
      //             "password must be a string"
      //         ],
      //         "error": "Bad Request"
      //     }
      // }
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: { target: true },
      }),
    );
  await app.listen(8080);
}
bootstrap();
