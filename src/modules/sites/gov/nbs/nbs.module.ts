import { Module } from '@nestjs/common';
import { NbsService } from './nbs.service';

@Module({
  providers: [NbsService]
})
export class NbsModule {}
