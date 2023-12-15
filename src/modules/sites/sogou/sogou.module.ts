import { Module } from '@nestjs/common'
import { SogouController } from './sogou.controller'
import { SogouService } from './sogou.service'
import { SogouTask } from './sogou.task'

@Module({
  controllers: [SogouController],
  providers: [SogouService, SogouTask],
  exports: [SogouService, SogouTask]
})
export class SogouModule {}
