import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module';
import { CreateBookDto } from './dto';
import { User } from '@prisma/client';
import { AlreadyExistsException } from '@exceptions';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(createBookDto: CreateBookDto, user: User) {
    const { title, description, isbnCode, publishedAt } = createBookDto;
    const bookAlreadyRegistered = await this.prisma.book.findUnique({
      where: { isbnCode },
    });

    if (bookAlreadyRegistered) {
      throw new AlreadyExistsException('book', { isbnCode });
    }

    return this.prisma.book.create({
      data: {
        title,
        description,
        isbnCode,
        publishedAt: new Date(publishedAt),
        registeredByUser: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        registeredByUser: {
          include: {
            credentials: true,
          },
        },
      },
    });
  }
}
