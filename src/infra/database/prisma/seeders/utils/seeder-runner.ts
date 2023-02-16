import { Type } from '@nestjs/common';
import { Seeder } from './seeder';
import { PrismaClient } from '@prisma/client';

export class SeederRunner {
  constructor(private readonly prisma: PrismaClient) {}

  async run(...seeders: Type<Seeder<unknown>>[]) {
    for (const Seeder of seeders) {
      const seederInstance = new Seeder(this.prisma);
      const seederAlreadyExecuted = await this.prisma.seed.findFirst({
        where: { name: Seeder.name },
      });

      if (!seederAlreadyExecuted) {
        await seederInstance.seed();
        await this.prisma.seed.create({ data: { name: Seeder.name } });
      }
    }
  }
}
