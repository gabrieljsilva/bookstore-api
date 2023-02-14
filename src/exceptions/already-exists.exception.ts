import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { EXCEPTION_CODES } from '@enums';

export class AlreadyExistsException<T = any> extends BaseException {
  constructor(resource: string, payload: T) {
    super(
      {
        message: `${resource} already exists`,
        code: EXCEPTION_CODES.RESOURCE_ALREADY_EXISTS,
        payload,
      },
      HttpStatus.CONFLICT,
    );
  }
}
