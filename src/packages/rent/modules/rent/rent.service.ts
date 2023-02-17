import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/module';
import { CreateRentDto, ListRentsDto, ReturnBookDto } from './dto';
import { Prisma, User } from '@prisma/client';
import { AlreadyExistsException, NotFoundException } from '@exceptions';
import { addDays, endOfDay } from 'date-fns';
import RentWhereInput = Prisma.RentWhereInput;

@Injectable()
export class RentService {
  constructor(private readonly prisma: PrismaService) {}

  async isBookRented(bookId: string) {
    return this.prisma.rent.findFirst({
      where: {
        bookId: bookId,
        returnedIn: { isSet: false },
      },
    });
  }

  async createRent(createRentDto: CreateRentDto, user: User) {
    const { bookId, rentPeriodInDays } = createRentDto;
    const isBookAlreadyRented = await this.isBookRented(bookId);

    if (isBookAlreadyRented) {
      throw new AlreadyExistsException('rent', { bookId });
    }

    return this.prisma.rent.create({
      data: {
        book: { connect: { id: bookId } },
        user: { connect: { id: user.id } },
        returnDate: endOfDay(addDays(new Date(), rentPeriodInDays)),
      },
      include: { book: true },
    });
  }

  async listRents(listRentsDto: ListRentsDto) {
    const { offset, limit, userId, bookId } = listRentsDto;

    const listRentsQuery: RentWhereInput = {
      userId,
      bookId,
    };

    const rentsCount = await this.prisma.rent.count({ where: listRentsQuery });
    const rents = await this.prisma.rent.findMany({
      where: listRentsQuery,
      skip: offset,
      take: limit,
      include: {
        book: true,
        user: { include: { credentials: true } },
      },
    });

    return {
      rents,
      rentsCount,
    };
  }

  async returnBook(returnBookDto: ReturnBookDto) {
    const { rentId } = returnBookDto;
    const rent = await this.prisma.rent.findFirst({
      where: {
        id: rentId,
        returnedIn: {
          isSet: false,
        },
      },
    });

    if (!rent) {
      throw new NotFoundException('rent', { id: rentId });
    }

    return this.prisma.rent.update({
      where: { id: rentId },
      data: {
        returnedIn: new Date(),
      },
    });
  }
}
