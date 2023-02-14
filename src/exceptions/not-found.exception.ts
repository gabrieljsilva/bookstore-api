import { BaseException } from './base.exception';
import { EXCEPTION_CODES } from '@enums';
import { HttpStatus } from '@nestjs/common';

export class NotFoundException<T = unknown> extends BaseException {
  constructor(resource: string, payload: T) {
    super(
      {
        message: `${resource} not found`,
        code: EXCEPTION_CODES.NOT_FOUND,
        payload,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
