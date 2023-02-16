import { Seeder } from '../utils';

export class _001_Roles extends Seeder<string> {
  async seed() {
    await this.prisma.role.create({
      data: { name: this.data },
    });
  }

  get data() {
    return 'USER';
  }
}
