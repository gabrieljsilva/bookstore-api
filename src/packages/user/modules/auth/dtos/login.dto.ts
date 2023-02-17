import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class LoginDto {
  @Expose()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Expose()
  @IsString()
  @ApiProperty()
  password: string;
}
