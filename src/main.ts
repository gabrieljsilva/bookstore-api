import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from '@prisma/module/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { InvalidEntriesException } from '@exceptions';
import { JwtGuard } from './packages/user/modules/auth/jwt.guard';
import { PermissionGuard } from './packages/user/modules/auth/permission.guard';
import { GlobalHttpExceptionFilter } from '@exception-filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new InvalidEntriesException(errors),
      stopAtFirstError: true,
    }),
  );

  app.useGlobalGuards(new JwtGuard(new Reflector()));
  app.useGlobalGuards(new PermissionGuard(new Reflector()));
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Bookstore API ')
    .setDescription('The Bookstore API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
