import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@enums';
import { BaseException } from './base.exception';

export class CredentialsNotMatchException extends BaseException {
  constructor() {
    super(
      {
        message: `credentials not match`,
        code: EXCEPTION_CODES.CREDENTIALS_NOT_MATCH,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
