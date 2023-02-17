import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsString()
  @Length(3, 256)
  @ApiProperty()
  name: string;

  @Expose()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Expose()
  @IsString()
  @Length(8, 256)
  @ApiProperty()
  password: string;
}
