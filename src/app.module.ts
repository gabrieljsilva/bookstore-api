import { Controller, Get, Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/module/prisma.module';
import { UserModule } from './packages/user/user/user.module';
import { AuthModule } from './packages/user/auth/auth.module';

@Controller('')
class Hello {
  @Get()
  getHello() {
    return 'Hello World';
  }
}

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [Hello],
  providers: [],
})
export class AppModule {}
