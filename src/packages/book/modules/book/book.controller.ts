import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { BookService } from './book.service';
import { CreateBookDto } from './dto';
import { BookDataView } from './data-views';
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
    return BookDataView.fromDatabaseBook(book);
  }
}
