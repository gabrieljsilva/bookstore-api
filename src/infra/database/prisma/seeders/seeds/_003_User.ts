import { Seeder } from '../utils';
import { Hashing } from '../../../../../utils';

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

export class _003_User extends Seeder<User[]> {
  async seed() {
    for (const user of this.data) {
      const { name, email, password, role } = user;
      await this.prisma.user.create({
        data: {
          name,
          credentials: {
            create: {
              email,
              password: await Hashing.hash(password),
              roles: { connect: { name: role } },
            },
          },
        },
      });
    }
  }

  get data(): User[] {
    return [
      {
        name: 'Admin',
        email: 'admin@email.com',
        password: '123@abcd',
        role: 'ADMIN',
      },
    ];
  }
}
