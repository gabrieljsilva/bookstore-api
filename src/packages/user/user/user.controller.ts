import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos';
import { UserDataView } from './data-views';
import { IsPublic } from '@decorators';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return UserDataView.fromDatabaseUser(user);
  }
}
