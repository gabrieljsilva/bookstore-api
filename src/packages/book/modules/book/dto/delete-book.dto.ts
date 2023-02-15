import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DeleteBookDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  bookId: string;
}
