import { Module } from '@nestjs/common'
import { ZakerService } from './zaker.service'
import { ZakerController } from './zaker.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ZakerJob } from './zaker.job'
import { ZakerProcessor } from './zaker.processor'
import { BullModule } from '@nestjs/bull'
import { ZAKER_QUEUE_NAME } from './zaker.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: ZAKER_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: ZAKER_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [ZakerService, ZakerJob, ZakerProcessor],
  exports: [ZakerService, ZakerJob, ZakerProcessor],
  controllers: [ZakerController]
})
export class ZakerModule {}
