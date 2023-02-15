import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class GetBookByIdDto {
  @Expose()
  @IsString()
  bookId: string;
}
