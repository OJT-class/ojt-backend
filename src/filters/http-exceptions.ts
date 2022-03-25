import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      request = ctx.getRequest(),
      response = ctx.getResponse(),
      statusCode = exception.getStatus();

    return response.status(statusCode).json({
      status: statusCode,
      createBy: 'HttpExceptionFilter',
      message: exception?.['response'],
    });
  }
}
