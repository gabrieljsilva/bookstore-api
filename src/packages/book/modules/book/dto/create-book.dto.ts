import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsISBN, IsNotEmpty, IsString } from 'class-validator';

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
  @IsDate()
  @Type(() => Date)
  publishedAt: Date;
}
