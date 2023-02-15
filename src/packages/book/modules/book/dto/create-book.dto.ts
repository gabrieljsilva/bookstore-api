import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsISBN, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class CreateBookDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  @IsISBN()
  isbnCode: string;

  @Expose()
  @IsDateString()
  publishedAt: string;
}
