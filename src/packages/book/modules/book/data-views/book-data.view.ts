import { User, Book, Credentials } from '@prisma/client';
import { UserDataView } from '../../../../user/modules/user/data-views';

export class BookDataView {
  id: string;
  title: string;
  description: string;
  isbnCode: string;
  publishedAt: Date;
  deletedAt: Date;
  registeredByUser: UserDataView;
  deletedByUser: UserDataView;

  constructor(bookDataView: BookDataView) {
    this.id = bookDataView.id;
    this.title = bookDataView.title;
    this.description = bookDataView.description;
    this.isbnCode = bookDataView.isbnCode;
    this.deletedAt = bookDataView.deletedAt;
    this.publishedAt = bookDataView.publishedAt;
    this.registeredByUser = bookDataView.registeredByUser;
    this.deletedByUser = bookDataView.deletedByUser;
  }

  static fromDatabaseModel(
    book: Book & {
      deletedByUser?: User & { credentials: Credentials };
      registeredByUser?: User & { credentials: Credentials };
    },
  ) {
    return new BookDataView({
      id: book.id,
      title: book.title,
      description: book.description,
      isbnCode: book.isbnCode,
      publishedAt: book.publishedAt,
      deletedAt: book.deletedAt || undefined,
      registeredByUser:
        book?.registeredByUser &&
        UserDataView.fromDatabaseModel(book.registeredByUser),
      deletedByUser:
        book.deletedByUser &&
        UserDataView.fromDatabaseModel(book.deletedByUser),
    });
  }
}
