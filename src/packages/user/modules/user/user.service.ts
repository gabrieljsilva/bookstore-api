import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module';
import { CreateUserDto } from './dtos';
import { AlreadyExistsException } from '@exceptions';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name } = createUserDto;
    const userAlreadyExists = await this.prisma.user.findFirst({
      where: {
        name: {
          equals: createUserDto.name,
          mode: 'insensitive',
        },
      },
    });

    if (userAlreadyExists) {
      throw new AlreadyExistsException('user', { name });
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }
}
