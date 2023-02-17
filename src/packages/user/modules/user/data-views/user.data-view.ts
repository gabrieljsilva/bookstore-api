import { User, Credentials } from '@prisma/client';

type UserDatabaseModel = User & { credentials: Credentials };

export class UserDataView {
  id: string;
  name: string;
  email: string;

  constructor(user: UserDataView) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  static fromDatabaseModel(user: UserDatabaseModel): UserDataView {
    const { id, name, credentials } = user;
    const { email } = credentials;
    return new UserDataView({ id, name, email });
  }
}
