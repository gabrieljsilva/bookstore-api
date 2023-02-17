import { PaginationInput } from '@models';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { IsObjectId } from '@utils';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ListRentsDto extends PaginationInput {
  @Expose()
  @IsString()
  @IsOptional()
  @IsObjectId()
  @ApiProperty()
  userId?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @IsObjectId()
  @ApiProperty()
  bookId?: string;
}
