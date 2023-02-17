import { Exclude, Expose, Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationInput } from '@models';
import { ApiProperty } from '@nestjs/swagger';
import { BookStatus } from '@enums';

@Exclude()
export class ListBooksDto extends PaginationInput {
  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  searchText: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value ? value : 'active'))
  @IsIn(Object.values(BookStatus))
  @ApiProperty({ enum: [Object.values(BookStatus)], default: BookStatus.all })
  status?: BookStatus;
}
