import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from '@decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { LoginDataView } from './data-views';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.authService.login(loginDto);
    return new LoginDataView(accessToken);
  }
}
