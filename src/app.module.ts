import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { UserModule } from './packages/user/modules/user/user.module';
import { AuthModule } from './packages/user/modules/auth/auth.module';
import { BookModule } from './packages/book/modules/book/book.module';
import { RentModule } from './packages/rent/modules/rent/rent.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, BookModule, RentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
