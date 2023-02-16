import { PrismaClient } from '@prisma/client';
import { SeederRunner } from './utils';
import {
  _001_Roles,
  _002_Permissions,
  _003_CustomerPermissions,
} from './seeds';

const prisma = new PrismaClient();
const seederRunner = new SeederRunner(prisma);

async function main() {
  await seederRunner.run(
    _001_Roles,
    _002_Permissions,
    _003_CustomerPermissions,
  );
}

main().then(async () => {
  await prisma.$disconnect();
});
