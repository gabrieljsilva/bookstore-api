import { Factory } from 'fishery';
import { Credentials } from '@prisma/client';
import { ObjectId } from 'bson';
import { Hashing } from '@utils';

export const credentialsFactory = Factory.define<Credentials>(() => {
  return {
    id: ObjectId.generate().toString(),
    email: 'john.doe@email.com',
    password: Hashing.hashSync('123@abc'),
    rolesIds: [],
    updatedAt: new Date(),
    createdAt: new Date(),
  };
});
