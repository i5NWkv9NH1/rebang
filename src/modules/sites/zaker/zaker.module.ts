import { Module } from '@nestjs/common'
import { ZakerService } from './zaker.service'
import { ZakerController } from './zaker.controller'
import { ZakerTask } from './zaker.task'

@Module({
  providers: [ZakerService, ZakerTask],
  exports: [ZakerService, ZakerTask],
  controllers: [ZakerController]
})
export class ZakerModule {}
