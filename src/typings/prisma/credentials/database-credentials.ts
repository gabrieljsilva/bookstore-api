import { Prisma } from '@prisma/client';
import CredentialsArgs = Prisma.CredentialsArgs;

const databaseCredentials = Prisma.validator<CredentialsArgs>()({
  include: {
    user: true,
    roles: {
      include: {
        permissions: true,
      },
    },
  },
});

export type DatabaseCredentials = Prisma.CredentialsGetPayload<
  typeof databaseCredentials
>;
