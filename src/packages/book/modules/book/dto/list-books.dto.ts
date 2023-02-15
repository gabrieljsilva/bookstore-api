import { Exclude, Expose, Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationInput } from '@models';

@Exclude()
export class ListBooksDto extends PaginationInput {
  @Expose()
  @IsString()
  @IsOptional()
  searchText: string;

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value ? value : 'active'))
  @IsIn(['active', 'deleted', 'all'])
  status?: 'active' | 'deleted' | 'all';
}
