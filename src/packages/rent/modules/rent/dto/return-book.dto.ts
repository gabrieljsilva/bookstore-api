import { Exclude, Expose } from 'class-transformer';
import { IsObjectId } from '@utils';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ReturnBookDto {
  @Expose()
  @IsObjectId()
  @ApiProperty()
  rentId: string;
}
