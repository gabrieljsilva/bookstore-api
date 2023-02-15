import { User, Book, Credentials } from '@prisma/client';
import { UserDataView } from '../../../../user/modules/user/data-views';

export class BookDataView {
  title: string;
  description: string;
  isbnCode: string;
  publishedAt: Date;
  registeredBy: UserDataView;

  constructor(bookDataView: BookDataView) {
    this.title = bookDataView.title;
    this.description = bookDataView.description;
    this.isbnCode = bookDataView.isbnCode;
    this.publishedAt = bookDataView.publishedAt;
    this.registeredBy = bookDataView.registeredBy;
  }

  static fromDatabaseBook(
    book: Book & {
      registeredByUser: User & {
        credentials: Credentials;
      };
    },
  ) {
    return new BookDataView({
      title: book.title,
      description: book.description,
      isbnCode: book.isbnCode,
      publishedAt: book.publishedAt,
      registeredBy: UserDataView.fromUserEntity(book.registeredByUser),
    });
  }
}
