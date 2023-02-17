import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { IsObjectId } from '@utils';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class BookIdDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsObjectId()
  @ApiProperty()
  bookId: string;
}
