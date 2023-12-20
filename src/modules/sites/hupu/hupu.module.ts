import { Module } from '@nestjs/common'
import { HupuService } from './hupu.service'
import { HupuController } from './hupu.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HupuEntity } from './hupu.entity'
import { HupuJob } from './hupu.job'
import { HupuProcessor } from './hupu.processor'
import { BullModule } from '@nestjs/bull'
import { HUPU_QUEUE_NAME } from './hupu.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: HUPU_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: HUPU_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [HupuService, HupuJob, HupuProcessor],
  exports: [HupuService, HupuJob, HupuProcessor],
  controllers: [HupuController]
})
export class HupuModule {}
