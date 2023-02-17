import { Factory } from 'fishery';
import { Book, User } from '@prisma/client';
import { ObjectId } from 'bson';
import { Nullable } from '../../../domain/types';

export const bookFactory = Factory.define<
  Book & { registeredByUser?: Nullable<User>; deletedByUserId?: Nullable<User> }
>(() => {
  return {
    id: new ObjectId().toString(),
    title: 'Lorem Ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus sollicitudin nulla eu mattis. Vivamus ut elementum massa. Donec in tincidunt quam, eu ullamcorper enim.',
    createdAt: new Date('01-01-2020'),
    updatedAt: new Date('01-01-2020'),
    isbnCode: '0-7691-0197-6',
    publishedAt: new Date('01-01-2020'),
    registeredByUserId: new ObjectId().toString(),
    deletedByUserId: null,
    deletedAt: null,
  };
});
