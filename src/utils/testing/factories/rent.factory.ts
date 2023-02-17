import { Factory } from 'fishery';
import { Book, Rent, User } from '@prisma/client';
import { ObjectId } from 'bson';
import { Nullable } from '../../../domain/types';

export const rentFactory = Factory.define<
  Rent & { book?: Nullable<Book>; user?: Nullable<User> }
>(() => {
  return {
    id: new ObjectId().toString(),
    userId: new ObjectId().toString(),
    bookId: new ObjectId().toString(),
    returnDate: new Date(),
    returnedIn: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});
