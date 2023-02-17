import { Book, Credentials, Rent, User } from '@prisma/client';
import { UserDataView } from '../../../../user/modules/user/data-views';
import { BookDataView } from '../../../../book/modules/book/data-views';

type RentDatabaseModel = Rent & {
  user?: User & {
    credentials: Credentials;
  };
  book?: Book;
};

export class RentDataView {
  id: string;
  returnDate: Date;
  returnedIn?: Date;
  user?: UserDataView;
  book?: BookDataView;
  createdAt: Date;
  updatedAt: Date;

  constructor(rentDataView: RentDataView) {
    this.id = rentDataView.id;
    this.returnDate = rentDataView.returnDate;
    this.returnedIn = rentDataView.returnedIn;
    this.user = rentDataView.user;
    this.book = rentDataView.book;
    this.createdAt = rentDataView.createdAt;
    this.updatedAt = rentDataView.updatedAt;
  }

  static fromDatabaseModel(rent: RentDatabaseModel) {
    const { user, book, returnedIn } = rent;

    return new RentDataView({
      id: rent.id,
      returnDate: rent.returnDate,
      returnedIn: returnedIn && returnedIn,
      user: user && UserDataView.fromDatabaseModel(user),
      book: book && BookDataView.fromDatabaseModel(book),
      createdAt: rent.createdAt,
      updatedAt: rent.updatedAt,
    });
  }
}
