import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsISBN, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateBookDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @Expose()
  @IsString()
  @ApiProperty()
  description: string;

  @Expose()
  @IsString()
  @IsISBN()
  @ApiProperty()
  isbnCode: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  publishedAt: Date;
}
