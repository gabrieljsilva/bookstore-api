import { Seeder } from '../utils';

export class _001_Roles extends Seeder<string[]> {
  async seed() {
    await this.prisma.role.createMany({
      data: this.data.map((role) => ({ name: role })),
    });
  }

  get data(): string[] {
    return ['ADMIN', 'CUSTOMER'];
  }
}
