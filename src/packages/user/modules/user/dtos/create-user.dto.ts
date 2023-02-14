import { Exclude, Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';

@Exclude()
export class CreateUserDto {
  @Expose()
  @IsString()
  @Length(3, 256)
  name: string;
}
