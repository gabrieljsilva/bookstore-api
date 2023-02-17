import { User, Credentials, Role } from '@prisma/client';

type UserDatabaseModel = User & {
  credentials: Credentials & { roles?: Role[] };
};

export class UserDataView {
  id: string;
  name: string;
  email: string;
  roles?: string[];

  constructor(user: UserDataView) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.roles = user.roles;
  }

  static fromDatabaseModel(user: UserDatabaseModel): UserDataView {
    const { id, name, credentials } = user;
    const { email, roles } = credentials;

    return new UserDataView({
      id,
      name,
      email,
      roles: roles && roles.map((role) => role.name),
    });
  }
}
