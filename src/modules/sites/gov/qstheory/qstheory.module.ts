import { Module } from '@nestjs/common';
import { QstheoryService } from './qstheory.service';

@Module({
  providers: [QstheoryService]
})
export class QstheoryModule {}
