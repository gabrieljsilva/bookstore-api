import { Controller, Get, Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { UserModule } from './packages/user/modules/user/user.module';
import { AuthModule } from './packages/user/modules/auth/auth.module';
import { BookModule } from './packages/book/modules/book/book.module';

@Controller('')
class Hello {
  @Get()
  getHello() {
    return 'Hello World';
  }
}

@Module({
  imports: [PrismaModule, UserModule, AuthModule, BookModule],
  controllers: [Hello],
  providers: [],
})
export class AppModule {}
