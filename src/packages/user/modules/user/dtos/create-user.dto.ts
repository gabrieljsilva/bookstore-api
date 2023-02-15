import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsString()
  @Length(3, 256)
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @Length(8, 256)
  password: string;
}
