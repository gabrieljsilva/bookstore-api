import { Seeder } from '../utils';

interface PermissionSeeder {
  roleName: string;
  permissions: string[];
}

export class _002_Permissions extends Seeder<PermissionSeeder> {
  async seed() {
    const role = await this.prisma.role.findFirst({
      where: { name: this.data.roleName },
    });

    if (role) {
      await this.prisma.permission.createMany({
        data: this.data.permissions.map((permission) => {
          return {
            name: permission,
            roleId: role.id,
          };
        }),
      });
    }
  }

  get data(): PermissionSeeder {
    return {
      roleName: 'ADMIN',
      permissions: [
        'CREATE_BOOK',
        'READ_BOOKS',
        'READ_BOOK',
        'UPDATE_BOOK',
        'DELETE_BOOK',

        'READ_RENTS',
        'READ_RENT',
        'CREATE_RENT',
        'UPDATE_RENT',
      ],
    };
  }
}
