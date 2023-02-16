import { Prisma } from '@prisma/client';
import CredentialsArgs = Prisma.CredentialsArgs;

const credentialsModel = Prisma.validator<CredentialsArgs>()({
  include: {
    user: true,
    roles: {
      include: {
        permissions: true,
      },
    },
  },
});

export type CredentialsModel = Prisma.CredentialsGetPayload<
  typeof credentialsModel
>;
