import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@enums';
import { BaseException } from './base.exception';

export class BookRentedOrDeleted extends BaseException {
  constructor(bookId: string) {
    super(
      {
        message: `book rented or deleted`,
        code: EXCEPTION_CODES.BOOK_RENTED_OR_DELETED,
        payload: { bookId },
      },
      HttpStatus.CONFLICT,
    );
  }
}
