import { Module } from '@nestjs/common';
import { CeaService } from './cea.service';

@Module({
  providers: [CeaService]
})
export class CeaModule {}
