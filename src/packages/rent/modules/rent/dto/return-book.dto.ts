import { Exclude, Expose } from 'class-transformer';
import { IsObjectId } from '@utils';

@Exclude()
export class ReturnBookDto {
  @Expose()
  @IsObjectId()
  rentId: string;
}
