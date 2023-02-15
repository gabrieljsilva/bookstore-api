import { Exclude, Expose, Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

@Exclude()
export abstract class PaginationInput {
  @Expose()
  @IsInt()
  @Transform(({ value }) => Number(value))
  offset: number;

  @Expose()
  @IsInt()
  @Transform(({ value }) => Number(value))
  limit: number;
}
