import { BaseException } from './base.exception';
import { EXCEPTION_CODES } from '@enums';
import { HttpStatus } from '@nestjs/common';

export class OutOfRangeException extends BaseException {
  constructor(take: number, skip: number, total: number) {
    super(
      {
        message: `cannot take ${take} or skip ${skip} item on total of ${total} items`,
        code: EXCEPTION_CODES.OUT_OF_RANGE,
        payload: {
          take,
          skip,
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
