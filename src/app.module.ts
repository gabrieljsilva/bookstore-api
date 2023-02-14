import { Controller, Get, Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { UserModule } from './packages/user/modules/user/user.module';

@Controller('')
class Hello {
  @Get()
  getHello() {
    return 'Hello World';
  }
}

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [Hello],
  providers: [],
})
export class AppModule {}
