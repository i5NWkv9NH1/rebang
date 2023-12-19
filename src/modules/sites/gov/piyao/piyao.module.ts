import { Module } from '@nestjs/common';
import { PiyaoService } from './piyao.service';

@Module({
  providers: [PiyaoService]
})
export class PiyaoModule {}
