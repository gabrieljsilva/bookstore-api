import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CredentialsModel, PaginatedData } from '@models';
import { CurrentAccessCredentials, RequirePermissions } from '@decorators';
import { RentService } from './rent.service';
import { CreateRentDto, ListRentsDto } from './dto';
import { RentDataView } from './data-views';

@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  @RequirePermissions('RENT_BOOK')
  async createRent(
    @Body() createRentDto: CreateRentDto,
    @CurrentAccessCredentials() credentials: CredentialsModel,
  ) {
    const rent = await this.rentService.createRent(
      createRentDto,
      credentials.user,
    );
    return RentDataView.fromDatabaseModel(rent);
  }

  @Get()
  async listRents(@Query() listRentsDto: ListRentsDto) {
    const { rents, rentsCount } = await this.rentService.listRents(
      listRentsDto,
    );

    return new PaginatedData({
      items: rents.map(RentDataView.fromDatabaseModel),
      count: rentsCount,
    });
  }
}
