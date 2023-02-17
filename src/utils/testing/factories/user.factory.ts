import { Factory } from 'fishery';
import { Credentials, User } from '@prisma/client';
import { ObjectId } from 'bson';
import { credentialsFactory } from './credentials.factory';

export const userFactory = Factory.define<User & { credentials: Credentials }>(
  () => {
    return {
      id: ObjectId.generate().toString(),
      name: 'Jonh Doe',
      credentialsId: ObjectId.generate().toString(),
      credentials: credentialsFactory.build(),
      updatedAt: new Date(),
      createdAt: new Date(),
    };
  },
);
