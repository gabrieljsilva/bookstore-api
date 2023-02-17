import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from '@decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { LoginDataView } from './data-views';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'user logged successfully',
    type: LoginDataView,
  })
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(loginDto);
    return new LoginDataView(accessToken);
  }
}
