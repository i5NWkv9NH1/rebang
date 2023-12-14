import { Module } from '@nestjs/common';
import { AgefansService } from './agefans.service';
import { AgefansController } from './agefans.controller';

@Module({
  providers: [AgefansService],
  controllers: [AgefansController]
})
export class AgefansModule {}
