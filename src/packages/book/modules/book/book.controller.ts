import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { BookService } from './book.service';
import { CreateBookDto, DeleteBookDto } from './dto';
import { CreateBookDataView } from './data-views';
import { CurrentUser } from '@decorators';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @CurrentUser() user: User,
  ) {
    const book = await this.bookService.createBook(createBookDto, user);
    return CreateBookDataView.fromDatabaseBook(book);
  }

  @Delete(':bookId')
  async deleteBook(
    @Param() deleteBookDto: DeleteBookDto,
    @CurrentUser() user: User,
  ) {
    const book = await this.bookService.deleteBook(deleteBookDto, user);
    return CreateBookDataView.fromDatabaseBook(book);
  }
}
