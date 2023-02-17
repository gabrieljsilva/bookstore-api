import { User, Book, Credentials } from '@prisma/client';
import { UserDataView } from '../../../../user/modules/user/data-views';
import { ApiProperty } from '@nestjs/swagger';

type BookDatabaseModel = Book & {
  deletedByUser?: User & { credentials: Credentials };
  registeredByUser?: User & { credentials: Credentials };
};

export class BookDataView {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isbnCode: string;

  @ApiProperty()
  publishedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty({ nullable: true })
  registeredByUser?: UserDataView;

  @ApiProperty({ nullable: true })
  deletedByUser?: UserDataView;

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

  static fromDatabaseModel(book: BookDatabaseModel) {
    const { registeredByUser, deletedByUser } = book;
    return new BookDataView({
      id: book.id,
      title: book.title,
      description: book.description,
      isbnCode: book.isbnCode,
      publishedAt: book.publishedAt,
      deletedAt: book.deletedAt || undefined,
      registeredByUser:
        registeredByUser && UserDataView.fromDatabaseModel(registeredByUser),
      deletedByUser:
        deletedByUser && UserDataView.fromDatabaseModel(deletedByUser),
    });
  }
}
