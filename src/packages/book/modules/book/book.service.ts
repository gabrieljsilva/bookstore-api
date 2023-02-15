import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module';
import { CreateBookDto, DeleteBookDto } from './dto';
import { Prisma, User } from '@prisma/client';
import { AlreadyExistsException, NotFoundException } from '@exceptions';
import { ListBooksDto } from './dto/list-books.dto';
import BookWhereInput = Prisma.BookWhereInput;
import DateTimeNullableFilter = Prisma.DateTimeNullableFilter;
import StringFilter = Prisma.StringFilter;

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async listBooks(listBooksDto: ListBooksDto) {
    const { offset, limit, searchText, status } = listBooksDto;

    const statusQuery: DateTimeNullableFilter = {};

    if (status === 'active') {
      statusQuery['isSet'] = false;
    }
    if (status === 'deleted') {
      statusQuery['isSet'] = true;
    }

    const searchTextQuery: StringFilter = {
      contains: searchText,
      mode: 'insensitive',
    };

    const listBooksFilter: BookWhereInput = {
      deletedAt: statusQuery,
      OR: [
        { title: searchTextQuery },
        { description: searchTextQuery },
        { registeredByUser: { name: searchTextQuery } },
        { deletedByUser: { name: searchTextQuery } },
      ],
    };

    const booksCount = await this.prisma.book.count({
      where: listBooksFilter,
    });

    const books = await this.prisma.book.findMany({
      where: listBooksFilter,
      take: limit,
      skip: offset,
      include: {
        registeredByUser: {
          include: {
            credentials: true,
          },
        },
        deletedByUser: {
          include: {
            credentials: true,
          },
        },
      },
    });

    return {
      books,
      count: booksCount,
    };
  }

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
