import { addDays, endOfDay } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/module';
import { BookRentedOrDeleted, NotFoundException } from '@exceptions';
import { UserModel } from '@models';
import { Roles } from '@enums';
import { CreateRentDto, ListRentsDto, ReturnBookDto } from './dto';
import { BookService } from '../../../book/modules/book/book.service';

import RentWhereInput = Prisma.RentWhereInput;

@Injectable()
export class RentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookService: BookService,
  ) {}

  async createRent(createRentDto: CreateRentDto) {
    const { bookId, customerId, rentPeriodInDays } = createRentDto;

    const customer = await this.prisma.user.findFirst({
      where: {
        id: customerId,
        credentials: {
          roles: { some: { name: 'CUSTOMER' } },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException('user', { id: customerId });
    }

    const isBookAlreadyRented = await this.bookService.isBookRentedOrDeleted(
      bookId,
    );
    if (isBookAlreadyRented) {
      throw new BookRentedOrDeleted(bookId);
    }

    return this.prisma.rent.create({
      data: {
        book: { connect: { id: bookId } },
        user: { connect: { id: customerId } },
        returnDate: endOfDay(addDays(new Date(), rentPeriodInDays)),
      },
      include: { book: true },
    });
  }

  async listRents(listRentsDto: ListRentsDto, user: UserModel) {
    const { offset, limit, userId, bookId } = listRentsDto;

    const listRentsQuery: RentWhereInput = {
      userId,
      bookId,
    };

    const isUserCustomer = user.credentials.roles.some(
      (role) => role.name === Roles.CUSTOMER,
    );

    if (isUserCustomer) {
      listRentsQuery['user'] = {
        id: user.id,
      };
    }

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
        returnedIn: { isSet: false },
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
