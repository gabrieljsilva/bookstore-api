import { PaginationInput } from '@models';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { IsObjectId } from '@utils';

@Exclude()
export class ListRentsDto extends PaginationInput {
  @Expose()
  @IsString()
  @IsOptional()
  @IsObjectId()
  userId?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @IsObjectId()
  bookId?: string;
}
