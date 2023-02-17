import { ApiProperty } from '@nestjs/swagger';

export class PaginatedData<T = unknown> {
  @ApiProperty()
  items: T[];

  @ApiProperty()
  count: number;

  constructor(data: PaginatedData<T>) {
    const { items, count } = data;
    this.items = items;
    this.count = count;
  }
}
