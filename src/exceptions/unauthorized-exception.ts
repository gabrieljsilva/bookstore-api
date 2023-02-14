import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@enums';
import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
  constructor() {
    super(
      {
        message: `invalid or expired authentication token`,
        code: EXCEPTION_CODES.UNAUTHORIZED_USER,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
