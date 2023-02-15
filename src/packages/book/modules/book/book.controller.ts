import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { BookService } from './book.service';
import { CreateBookDto, DeleteBookDto } from './dto';
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
      items: books.map(BookDataView.fromDatabaseBook),
      count,
    });
  }

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @CurrentUser() user: User,
  ) {
    const book = await this.bookService.createBook(createBookDto, user);
    return BookDataView.fromDatabaseBook(book);
  }

  @Delete(':bookId')
  async deleteBook(
    @Param() deleteBookDto: DeleteBookDto,
    @CurrentUser() user: User,
  ) {
    const book = await this.bookService.deleteBook(deleteBookDto, user);
    return BookDataView.fromDatabaseBook(book);
  }
}
