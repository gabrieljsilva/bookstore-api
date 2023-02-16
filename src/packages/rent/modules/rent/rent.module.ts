import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';

@Module({
  imports: [],
  providers: [RentService],
  controllers: [RentController],
  exports: [],
})
export class RentModule {}
