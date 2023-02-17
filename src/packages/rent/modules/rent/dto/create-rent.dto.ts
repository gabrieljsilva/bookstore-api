import { Exclude, Expose } from 'class-transformer';
import { IsObjectId } from '@utils';
import { IsInt } from 'class-validator';

@Exclude()
export class CreateRentDto {
  @Expose()
  @IsObjectId()
  bookId: string;

  @Expose()
  @IsObjectId()
  customerId: string;

  @Expose()
  @IsInt()
  rentPeriodInDays: number;
}
