import { Module } from '@nestjs/common';
import { DswxyjyService } from './dswxyjy.service';

@Module({
  providers: [DswxyjyService]
})
export class DswxyjyModule {}
