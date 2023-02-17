import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginatedData, UserModel } from '@models';
import { CurrentUser, RequirePermissions } from '@decorators';
import { RentService } from './rent.service';
import { CreateRentDto, ListRentsDto, ReturnBookDto } from './dto';
import { RentDataView } from './data-views';

@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  @RequirePermissions('RENT_BOOK')
  async createRent(
    @Body() createRentDto: CreateRentDto,
    @CurrentUser() user: UserModel,
  ) {
    const rent = await this.rentService.createRent(createRentDto, user);
    return RentDataView.fromDatabaseModel(rent);
  }

  @Get()
  @RequirePermissions('READ_RENTS')
  async listRents(@Query() listRentsDto: ListRentsDto) {
    const { rents, rentsCount } = await this.rentService.listRents(
      listRentsDto,
    );

    return new PaginatedData({
      items: rents.map(RentDataView.fromDatabaseModel),
      count: rentsCount,
    });
  }

  @Post(':rentId/return')
  @RequirePermissions('UPDATE_BOOK')
  async returnBook(@Param() returnBookDto: ReturnBookDto) {
    const rent = await this.rentService.returnBook(returnBookDto);
    return RentDataView.fromDatabaseModel(rent);
  }
}
