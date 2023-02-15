import { Exclude, Expose } from 'class-transformer';
import { CreateBookDto } from './create-book.dto';
import {
  IsDateString,
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
  @IsDateString()
  @IsOptional()
  publishedAt?: string;
}
