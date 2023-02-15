import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module';
import { CreateBookDto, DeleteBookDto } from './dto';
import { User } from '@prisma/client';
import { AlreadyExistsException, NotFoundException } from '@exceptions';

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

  async deleteBook(deleteBookDto: DeleteBookDto, user: User) {
    const { bookId } = deleteBookDto;
    const book = await this.prisma.book.findFirst({
      where: {
        id: deleteBookDto.bookId,
        deletedAt: {
          isSet: false,
        },
      },
    });

    if (!book) {
      throw new NotFoundException('book', { id: bookId });
    }

    return this.prisma.book.update({
      where: { id: bookId },
      data: {
        deletedAt: new Date(),
        deletedByUser: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        deletedByUser: {
          include: {
            credentials: true,
          },
        },
        registeredByUser: {
          include: {
            credentials: true,
          },
        },
      },
    });
  }
}
