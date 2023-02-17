import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { BookModule } from '../../../book/modules/book/book.module';

@Module({
  imports: [BookModule],
  providers: [RentService],
  controllers: [RentController],
  exports: [],
})
export class RentModule {}
