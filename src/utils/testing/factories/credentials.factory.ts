import { Factory } from 'fishery';
import { Credentials, User } from '@prisma/client';
import { ObjectId } from 'bson';
import { Hashing } from '@utils';
import { Nullable } from '../../../domain/types';

export const credentialsFactory = Factory.define<
  Credentials & { user?: Nullable<User> }
>(() => {
  return {
    id: new ObjectId().toString(),
    email: 'john.doe@email.com',
    password: Hashing.hashSync('123@abc'),
    rolesIds: [],
    updatedAt: new Date(),
    createdAt: new Date(),
  };
});
