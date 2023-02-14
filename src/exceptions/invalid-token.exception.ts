import { BaseException } from './base.exception';
import { EXCEPTION_CODES } from '@enums';
import { HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends BaseException {
  constructor() {
    super(
      {
        message: `invalid token`,
        code: EXCEPTION_CODES.INVALID_TOKEN,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
