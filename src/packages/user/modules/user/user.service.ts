import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module';
import { CreateUserDto } from './dtos';
import { AlreadyExistsException } from '@exceptions';
import { Hashing } from '@utils';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const userAlreadyExists = await this.prisma.credentials.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (userAlreadyExists) {
      throw new AlreadyExistsException('user', { email });
    }

    return this.prisma.user.create({
      data: {
        name,

        credentials: {
          create: {
            email,
            password: await Hashing.hash(password),
            roles: {
              connect: { name: 'USER' },
            },
          },
        },
      },
      include: {
        credentials: true,
      },
    });
  }
}
