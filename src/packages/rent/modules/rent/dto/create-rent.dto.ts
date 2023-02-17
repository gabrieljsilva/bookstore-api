import { Exclude, Expose } from 'class-transformer';
import { IsObjectId } from '@utils';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateRentDto {
  @Expose()
  @IsObjectId()
  @ApiProperty()
  bookId: string;

  @Expose()
  @IsObjectId()
  @ApiProperty()
  customerId: string;

  @Expose()
  @IsInt()
  @ApiProperty()
  rentPeriodInDays: number;
}
