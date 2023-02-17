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
import { BookService } from './book.service';
import { CreateBookDto, BookIdDto, GetBookByIdDto, UpdateBookDto } from './dto';
import { BookDataView } from './data-views';
import { CurrentUser, RequirePermissions } from '@decorators';
import { ListBooksDto } from './dto/list-books.dto';
import { PaginatedData, UserModel } from '@models';
import {
  ApiOkResponse,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginateSwaggerResponse } from '@utils';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @RequirePermissions('READ_BOOKS')
  @ApiOkResponse({
    description: 'List all books paginated',
    type: PaginateSwaggerResponse(BookDataView),
  })
  async listBooks(@Query() listBooksDto: ListBooksDto) {
    const { books, count } = await this.bookService.listBooks(listBooksDto);
    return new PaginatedData({
      items: books.map(BookDataView.fromDatabaseModel),
      count,
    });
  }

  @Get(':bookId')
  @RequirePermissions('READ_BOOK')
  @ApiOkResponse({
    description: 'Get book by id',
    type: BookDataView,
  })
  async getBookById(@Param() getBookByIdDto: GetBookByIdDto) {
    const book = await this.bookService.getBookById(getBookByIdDto);
    return BookDataView.fromDatabaseModel(book);
  }

  @Post()
  @RequirePermissions('CREATE_BOOK')
  @ApiOkResponse({
    description: 'Create a book',
    type: BookDataView,
  })
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @CurrentUser() user: UserModel,
  ) {
    const book = await this.bookService.createBook(createBookDto, user);
    return BookDataView.fromDatabaseModel(book);
  }

  @Delete(':bookId')
  @RequirePermissions('DELETE_BOOK')
  @ApiOkResponse({
    description: 'Delete a book by id',
    type: BookDataView,
  })
  async deleteBook(
    @Param() bookIdDto: BookIdDto,
    @CurrentUser() user: UserModel,
  ) {
    const book = await this.bookService.deleteBook(bookIdDto, user);
    return BookDataView.fromDatabaseModel(book);
  }

  @Put(':bookId')
  @RequirePermissions('UPDATE_BOOK')
  @ApiProperty({
    description: 'Update book by id',
    type: BookDataView,
  })
  async updateBook(
    @Body() updateBookDto: UpdateBookDto,
    @Param() bookIdDto: BookIdDto,
  ) {
    const book = await this.bookService.updateBook(bookIdDto, updateBookDto);
    return BookDataView.fromDatabaseModel(book);
  }
}
