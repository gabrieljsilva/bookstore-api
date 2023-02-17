import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos';
import { UserDataView } from './data-views';
import { CurrentUser, IsPublic } from '@decorators';
import { UserModel } from '@models';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return UserDataView.fromDatabaseModel(user);
  }

  @Get('who-am-i')
  async whoAmI(@CurrentUser() user: UserModel) {
    return UserDataView.fromDatabaseModel(user);
  }
}
