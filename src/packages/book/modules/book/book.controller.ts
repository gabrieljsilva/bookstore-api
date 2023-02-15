import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { BookService } from './book.service';
import { CreateBookDto, BookIdDto, GetBookByIdDto, UpdateBookDto } from './dto';
import { BookDataView } from './data-views';
import { CurrentUser } from '@decorators';
import { ListBooksDto } from './dto/list-books.dto';
import { PaginatedData } from '@models';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async listBooks(@Query() listBooksDto: ListBooksDto) {
    const { books, count } = await this.bookService.listBooks(listBooksDto);
    return new PaginatedData({
      items: books.map(BookDataView.fromDatabaseModel),
      count,
    });
  }

  @Get(':bookId')
  async getBookById(@Param() getBookByIdDto: GetBookByIdDto) {
    const book = await this.bookService.getBookById(getBookByIdDto);
    return BookDataView.fromDatabaseModel(book);
  }

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @CurrentUser() user: User,
  ) {
    const book = await this.bookService.createBook(createBookDto, user);
    return BookDataView.fromDatabaseModel(book);
  }

  @Delete(':bookId')
  async deleteBook(@Param() bookIdDto: BookIdDto, @CurrentUser() user: User) {
    const book = await this.bookService.deleteBook(bookIdDto, user);
    return BookDataView.fromDatabaseModel(book);
  }

  @Put(':bookId')
  async updateBook(
    @Body() updateBookDto: UpdateBookDto,
    @Param() bookIdDto: BookIdDto,
  ) {
    const book = await this.bookService.updateBook(bookIdDto, updateBookDto);
    return BookDataView.fromDatabaseModel(book);
  }
}
