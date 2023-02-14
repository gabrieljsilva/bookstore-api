import { HttpException, HttpStatus } from '@nestjs/common';
import { Exception } from '@models';

export class BaseException extends HttpException {
  constructor(params: Exception, httpStatusCode: HttpStatus) {
    super(params, httpStatusCode);
  }
}
