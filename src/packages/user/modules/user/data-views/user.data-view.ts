import { User, Credentials, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Nullable } from '../../../../../domain/types';

type UserDatabaseModel = User & {
  credentials: Credentials & { roles?: Nullable<Role[]> };
};

export class UserDataView {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  roles?: string[];

  constructor(user: UserDataView) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.roles = user.roles;
  }

  static fromDatabaseModel(user: UserDatabaseModel): UserDataView {
    const { id, name, credentials } = user;
    const { email } = credentials;

    const roles = credentials.roles?.map((role) => role.name);

    return new UserDataView({
      id,
      name,
      email,
      roles: roles,
    });
  }
}
