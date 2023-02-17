import { Prisma } from '@prisma/client';
import UserArgs = Prisma.UserArgs;

const userModel = Prisma.validator<UserArgs>()({
  include: {
    credentials: {
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    },
  },
});

export type UserModel = Prisma.UserGetPayload<typeof userModel>;
