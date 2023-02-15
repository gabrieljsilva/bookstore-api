import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { IsObjectId } from '@utils';

@Exclude()
export class BookIdDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsObjectId()
  bookId: string;
}
