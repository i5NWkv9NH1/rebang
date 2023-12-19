import { Module } from '@nestjs/common';
import { ChinaService } from './china.service';
import { ChinaController } from './china.controller';

@Module({
  providers: [ChinaService],
  controllers: [ChinaController]
})
export class ChinaModule {}
