import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos';
import { UserDataView } from './data-views';
import { CurrentUser, IsPublic } from '@decorators';
import { UserModel } from '@models';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserDataView,
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists with informed e-mail',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return UserDataView.fromDatabaseModel(user);
  }

  @ApiResponse({
    status: 201,
    type: UserDataView,
  })
  @Get('who-am-i')
  async whoAmI(@CurrentUser() user: UserModel) {
    return UserDataView.fromDatabaseModel(user);
  }
}
