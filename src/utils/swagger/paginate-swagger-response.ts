import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedData } from '@models';

export function PaginateSwaggerResponse<T>(cls: Type) {
  class Paginated implements PaginatedData<T> {
    @ApiProperty({ type: cls, isArray: true })
    items: T[];

    @ApiProperty()
    count: number;
  }

  return Paginated;
}
