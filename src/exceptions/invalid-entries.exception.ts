import { BaseException } from './base.exception';
import { EXCEPTION_CODES } from '@enums';
import { HttpStatus, ValidationError } from '@nestjs/common';

export class InvalidEntriesException extends BaseException {
  constructor(errors: ValidationError[]) {
    const entries = {};

    for (const error of errors) {
      if (error.constraints) {
        const [firstConstraintError] = Object.values(error.constraints);
        entries[error.property] = firstConstraintError;
      }
    }

    super(
      {
        message: `invalid entries`,
        code: EXCEPTION_CODES.INVALID_ENTRIES,
        payload: entries,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
