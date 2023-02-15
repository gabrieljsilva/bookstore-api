import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsObjectId } from '@utils';

@Exclude()
export class GetBookByIdDto {
  @Expose()
  @IsString()
  @IsObjectId()
  bookId: string;
}
