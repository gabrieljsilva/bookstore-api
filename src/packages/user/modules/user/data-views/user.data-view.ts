import { User, Credentials } from '@prisma/client';

export class UserDataView {
  id: string;
  name: string;
  email: string;

  constructor(user: UserDataView) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  static fromDatabaseModel(
    user: User & { credentials: Credentials },
  ): UserDataView {
    const { id, name, credentials } = user;
    const { email } = credentials;
    return new UserDataView({ id, name, email });
  }
}
