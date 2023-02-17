import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const currentUser = request['user'];
    const httpStatus = exception.getStatus();
    const code = exceptionResponse['code'];
    const log = `status: ${httpStatus} ${currentUser?.id} ${code}`;

    //Todo - Implement custom logger
    console.error(`REQUEST ERROR ${log}`);

    response.status(status).send(exceptionResponse);
  }
}
