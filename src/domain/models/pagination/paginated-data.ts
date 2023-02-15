export class PaginatedData<T = unknown> {
  items: T[];
  count: number;

  constructor(data: PaginatedData<T>) {
    const { items, count } = data;
    this.items = items;
    this.count = count;
  }
}
