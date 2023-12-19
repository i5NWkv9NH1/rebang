import { Module } from '@nestjs/common';
import { MoeService } from './moe.service';

@Module({
  providers: [MoeService]
})
export class MoeModule {}
