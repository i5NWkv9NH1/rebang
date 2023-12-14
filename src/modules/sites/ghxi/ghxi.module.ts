import { Module } from '@nestjs/common';
import { GhxiService } from './ghxi.service';
import { GhxiController } from './ghxi.controller';

@Module({
  providers: [GhxiService],
  controllers: [GhxiController]
})
export class GhxiModule {}
