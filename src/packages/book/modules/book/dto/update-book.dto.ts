import { Exclude, Expose, Type } from 'class-transformer';
import { CreateBookDto } from './create-book.dto';
import {
  IsDate,
  IsISBN,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UpdateBookDto implements Partial<CreateBookDto> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ nullable: true })
  title?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  description?: string;

  @Expose()
  @IsString()
  @IsISBN()
  @IsOptional()
  @ApiProperty({ nullable: true })
  isbnCode?: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({ nullable: true })
  publishedAt?: Date;
}
