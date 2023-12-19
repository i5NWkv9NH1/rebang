import { Module } from '@nestjs/common';
import { GuangdongService } from './guangdong.service';

@Module({
  providers: [GuangdongService]
})
export class GuangdongModule {}
