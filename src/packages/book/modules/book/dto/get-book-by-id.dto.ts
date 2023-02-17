import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsObjectId } from '@utils';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class GetBookByIdDto {
  @Expose()
  @IsString()
  @IsObjectId()
  @ApiProperty()
  bookId: string;
}
