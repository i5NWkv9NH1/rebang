import { Module } from '@nestjs/common';
import { CcdiService } from './ccdi.service';

@Module({
  providers: [CcdiService]
})
export class CcdiModule {}
