import { Factory } from 'fishery';
import { Credentials, Role, User } from '@prisma/client';
import { ObjectId } from 'bson';
import { Nullable } from '../../../domain/types';

export const userFactory = Factory.define<
  User & { credentials?: Nullable<Credentials & { roles?: Nullable<Role[]> }> }
>(() => {
  return {
    id: new ObjectId().toString(),
    name: 'Jonh Doe',
    credentialsId: new ObjectId().toString(),
    updatedAt: new Date(),
    createdAt: new Date(),
  };
});
