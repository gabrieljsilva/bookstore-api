import { Exclude, Expose, Type } from 'class-transformer';
import { CreateBookDto } from './create-book.dto';
import {
  IsDate,
  IsISBN,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@Exclude()
export class UpdateBookDto implements Partial<CreateBookDto> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @Expose()
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @IsString()
  @IsISBN()
  @IsOptional()
  isbnCode?: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  publishedAt?: Date;
}
