import { DeepMockProxy, mockClear, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '@prisma/module';
import { Test } from '@nestjs/testing';
import { RentService } from './rent.service';
import { BookService } from '../../../book/modules/book/book.service';
import { bookFactory, rentFactory, userFactory } from '@testing';
import { ObjectId } from 'bson';
import { addDays, endOfDay } from 'date-fns';
import { CreateRentDto, ReturnBookDto } from './dto';
import { BookRentedOrDeleted, NotFoundException } from '@exceptions';

describe('Rent rests', () => {
  let rentService: RentService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RentService, BookService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep(PrismaService))
      .compile();

    rentService = module.get(RentService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(rentService).toBeDefined();
  });

  it('should be able to create rent', async () => {
    const bookMock = bookFactory.build();
    const userMock = userFactory.build();
    const rentMock = rentFactory.build();

    prisma.user.findFirst.mockResolvedValueOnce(userMock);
    prisma.book.findFirst.mockResolvedValueOnce(null);
    prisma.book.findUnique.mockResolvedValueOnce(bookMock);
    prisma.rent.create.mockResolvedValueOnce(rentMock);

    const createRentDto: CreateRentDto = {
      bookId: bookMock.id,
      customerId: userMock.id,
      rentPeriodInDays: 7,
    };

    const rent = await rentService.createRent(createRentDto);

    expect(ObjectId.isValid(rent.id)).toBe(true);
    expect(prisma.rent.create).toBeCalledWith({
      data: {
        book: { connect: { id: bookMock.id } },
        user: { connect: { id: userMock.id } },
        returnDate: endOfDay(
          addDays(new Date(), createRentDto.rentPeriodInDays),
        ),
      },
      include: { book: true },
    });
  });

  it('should not be able to create rent if book not exists', async () => {
    const bookMock = bookFactory.build();
    const userMock = userFactory.build();

    prisma.user.findFirst.mockResolvedValueOnce(userMock);
    prisma.book.findUnique.mockResolvedValueOnce(null);

    const createRentDto: CreateRentDto = {
      bookId: bookMock.id,
      customerId: userMock.id,
      rentPeriodInDays: 7,
    };

    await expect(rentService.createRent(createRentDto)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should be able to return book', async () => {
    const rentMock = rentFactory.build();
    const returnBookDto: ReturnBookDto = {
      rentId: rentMock.id,
    };

    prisma.rent.findFirst.mockResolvedValueOnce(rentMock);
    prisma.rent.update.mockResolvedValueOnce(rentMock);

    const rent = await rentService.returnBook(returnBookDto);

    expect(rent).toBeDefined();
  });

  it('should not be able to throw an erro if rent not found', async () => {
    const rentMock = rentFactory.build();
    const returnBookDto: ReturnBookDto = {
      rentId: rentMock.id,
    };

    prisma.rent.findFirst.mockResolvedValueOnce(null);

    await expect(rentService.returnBook(returnBookDto)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should not be able to create rent if book already rented or deleted', async () => {
    const bookMock = bookFactory.build();
    const userMock = userFactory.build();

    prisma.user.findFirst.mockResolvedValueOnce(userMock);
    prisma.book.findUnique.mockResolvedValueOnce(bookMock);
    prisma.book.findFirst.mockResolvedValueOnce(bookMock);

    const createRentDto: CreateRentDto = {
      bookId: bookMock.id,
      customerId: userMock.id,
      rentPeriodInDays: 7,
    };

    await expect(rentService.createRent(createRentDto)).rejects.toThrowError(
      BookRentedOrDeleted,
    );
  });
});
