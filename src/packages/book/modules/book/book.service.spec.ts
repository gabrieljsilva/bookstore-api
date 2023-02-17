import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '@prisma/module';
import { Test } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookIdDto, CreateBookDto, UpdateBookDto } from './dto';
import { bookFactory, userFactory } from '@testing';
import { ObjectId } from 'bson';
import {
  AlreadyExistsException,
  BookRentedOrDeleted,
  NotFoundException,
} from '@exceptions';

describe('Book service tests', () => {
  let bookService: BookService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BookService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep(PrismaService))
      .compile();

    bookService = module.get(BookService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Fortaleza Digital',
      description:
        'Fortaleza Digital de Dan Brown é o primeiro livro do escritor estadunidense, anterior aos best-sellers O Código da Vinci e a Anjos e Demônios',
      isbnCode: '978-85-80-41-405-9',
      publishedAt: new Date('2005-01-01'),
    };

    const user = userFactory.build();
    const bookMock = bookFactory.build({
      ...createBookDto,
      registeredByUser: {
        id: user.id,
      },
    });

    prisma.book.findUnique.mockResolvedValueOnce(null);
    prisma.book.create.mockResolvedValueOnce(bookMock);

    const book = await bookService.createBook(createBookDto, user);

    expect(ObjectId.isValid(book.id)).toBe(true);
    expect(book.title).toBe(createBookDto.title);
    expect(book.description).toBe(createBookDto.description);
  });

  it('should throw an error if try to create a book with already registered ISBN', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Fortaleza Digital',
      description:
        'Fortaleza Digital de Dan Brown é o primeiro livro do escritor estadunidense, anterior aos best-sellers O Código da Vinci e a Anjos e Demônios',
      isbnCode: '978-85-80-41-405-9',
      publishedAt: new Date('2005-01-01'),
    };

    const user = userFactory.build();
    const bookMock = bookFactory.build({
      ...createBookDto,
      registeredByUser: {
        id: user.id,
      },
    });

    prisma.book.findUnique.mockResolvedValueOnce(bookMock);
    prisma.book.create.mockResolvedValueOnce(bookMock);

    await expect(
      bookService.createBook(createBookDto, user),
    ).rejects.toThrowError(AlreadyExistsException);
  });

  it('should return true if a book is rented or deleted', async () => {
    const bookMock = bookFactory.build();
    prisma.book.findFirst.mockResolvedValueOnce(bookMock);
    await expect(bookService.isBookRentedOrDeleted(bookMock.id)).resolves.toBe(
      true,
    );
  });

  it('should return false if a book is not rented or deleted', async () => {
    await expect(
      bookService.isBookRentedOrDeleted(new ObjectId().toString()),
    ).resolves.toBe(false);
  });

  it('should be able to update a book be id', async () => {
    const bookMock = bookFactory.build();
    const updateBookDto: UpdateBookDto = {
      title: 'Fortaleza Digital',
      description:
        'Fortaleza Digital de Dan Brown é o primeiro livro do escritor estadunidense, anterior aos best-sellers O Código da Vinci e a Anjos e Demônios',
      isbnCode: '978-85-80-41-405-9',
      publishedAt: new Date('2005-01-01'),
    };
    const bookIdDto: BookIdDto = { bookId: bookMock.id };
    prisma.book.findUnique.mockResolvedValueOnce(bookMock);
    await bookService.updateBook(bookIdDto, updateBookDto);
    expect(prisma.book.update).toBeCalledTimes(1);
  });

  it('should not be able to update a book be id if book already rented of deleted', async () => {
    const bookMock = bookFactory.build();
    const updateBookDto: UpdateBookDto = {
      title: 'Fortaleza Digital',
      description:
        'Fortaleza Digital de Dan Brown é o primeiro livro do escritor estadunidense, anterior aos best-sellers O Código da Vinci e a Anjos e Demônios',
      isbnCode: '978-85-80-41-405-9',
      publishedAt: new Date('2005-01-01'),
    };
    const bookIdDto: BookIdDto = { bookId: bookMock.id };
    //Check if book exists
    prisma.book.findUnique.mockResolvedValueOnce(bookMock);

    //Check if book is rented or deleted
    prisma.book.findFirst.mockResolvedValueOnce(bookMock);

    await expect(
      bookService.updateBook(bookIdDto, updateBookDto),
    ).rejects.toThrowError(BookRentedOrDeleted);
  });

  it('should be able to delete a book', async () => {
    const userMock = userFactory.build();
    const bookMock = bookFactory.build();
    prisma.book.findFirst.mockResolvedValueOnce(null);
    prisma.book.update.mockResolvedValueOnce(bookMock);
    const deletedBook = await bookService.deleteBook(
      { bookId: bookMock.id },
      userMock,
    );
    expect(ObjectId.isValid(deletedBook.id)).toBe(true);
  });

  it('should not be able to delete a book if its rented or deleted', async () => {
    const userMock = userFactory.build();
    const bookMock = bookFactory.build();
    prisma.book.findFirst.mockResolvedValueOnce(bookMock);
    prisma.book.update.mockResolvedValueOnce(bookMock);

    await expect(
      bookService.deleteBook({ bookId: bookMock.id }, userMock),
    ).rejects.toThrowError(BookRentedOrDeleted);
  });

  it('should be able to list all books', async () => {
    const bookMocks = [
      bookFactory.build(),
      bookFactory.build(),
      bookFactory.build(),
      bookFactory.build(),
    ];

    prisma.book.findMany.mockResolvedValueOnce(bookMocks);
    prisma.book.count.mockResolvedValueOnce(bookMocks.length);

    const { count, books } = await bookService.listBooks({
      limit: 0,
      offset: 5,
      searchText: '',
    });

    expect(count).toBe(bookMocks.length);
    expect(bookMocks).toMatchObject(books);
  });

  it('should be able to find a book by id', async () => {
    const bookMock = bookFactory.build();
    prisma.book.findFirst.mockResolvedValueOnce(bookMock);
    const book = await bookService.getBookById({ bookId: bookMock.id });
    expect(book).toMatchObject(bookMock);
  });

  it('should be able to throw and error if book not exists', async () => {
    const bookMock = bookFactory.build();
    prisma.book.findFirst.mockResolvedValueOnce(null);
    await expect(
      bookService.getBookById({ bookId: bookMock.id }),
    ).rejects.toThrowError(NotFoundException);
  });
});
