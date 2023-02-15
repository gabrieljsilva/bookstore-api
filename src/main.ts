import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from '@prisma/module/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { InvalidEntriesException } from '@exceptions';
import { JwtGuard } from './packages/user/modules/auth/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new InvalidEntriesException(errors),
      stopAtFirstError: true,
    }),
  );

  app.useGlobalGuards(new JwtGuard(new Reflector()));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}

bootstrap();
