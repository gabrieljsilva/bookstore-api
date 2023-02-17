import { Exclude, Expose, Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export abstract class PaginationInput {
  @Expose()
  @IsInt()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  offset: number;

  @Expose()
  @IsInt()
  @Transform(({ value }) => Number(value))
  @ApiProperty()
  limit: number;
}
