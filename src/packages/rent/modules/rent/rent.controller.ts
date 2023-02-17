import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginatedData, UserModel } from '@models';
import { CurrentUser, RequirePermissions } from '@decorators';
import { RentService } from './rent.service';
import { CreateRentDto, ListRentsDto, ReturnBookDto } from './dto';
import { RentDataView } from './data-views';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginateSwaggerResponse } from '@utils';

@ApiTags('Rents')
@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  @RequirePermissions('CREATE_RENT')
  @ApiOkResponse({
    description: 'Create new rent',
    type: RentDataView,
  })
  async createRent(@Body() createRentDto: CreateRentDto) {
    const rent = await this.rentService.createRent(createRentDto);
    return RentDataView.fromDatabaseModel(rent);
  }

  @Get()
  @RequirePermissions('READ_RENTS')
  @ApiOkResponse({
    description: 'List all rents paginated',
    type: PaginateSwaggerResponse(RentDataView),
  })
  async listRents(
    @Query() listRentsDto: ListRentsDto,
    @CurrentUser() user: UserModel,
  ) {
    const { rents, rentsCount } = await this.rentService.listRents(
      listRentsDto,
      user,
    );

    return new PaginatedData({
      items: rents.map(RentDataView.fromDatabaseModel),
      count: rentsCount,
    });
  }

  @Post(':rentId/return')
  @RequirePermissions('UPDATE_BOOK')
  @ApiOkResponse({
    description: 'Return a book from customer',
    type: RentDataView,
  })
  async returnBook(@Param() returnBookDto: ReturnBookDto) {
    const rent = await this.rentService.returnBook(returnBookDto);
    return RentDataView.fromDatabaseModel(rent);
  }
}
