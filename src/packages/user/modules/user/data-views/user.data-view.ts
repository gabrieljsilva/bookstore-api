import { Prisma } from '@prisma/client';

type User = Prisma.UserGetPayload<{
  select: { [K in keyof Required<Prisma.UserSelect>]: true };
}>;

export class UserDataView {
  id: string;
  name: string;
  email: string;

  constructor(user: UserDataView) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  static fromDatabase(user: User): UserDataView {
    const { id, name, credentials } = user;
    const { email } = credentials;
    return new UserDataView({ id, name, email });
  }
}
