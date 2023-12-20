import { Module } from '@nestjs/common'
import { HuxiuService } from './huxiu.service'
import { HuxiuController } from './huxiu.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HuxiuEntity } from './huxiu.entity'
import { HuxiuJob } from './huxiu.job'
import { HuxiuProcessor } from './huxiu.processor'
import { BullModule } from '@nestjs/bull'
import { HUXIU_QUEUE_NAME } from './huxiu.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: HUXIU_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: HUXIU_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [HuxiuService, HuxiuJob, HuxiuProcessor],
  exports: [HuxiuService, HuxiuJob, HuxiuProcessor],
  controllers: [HuxiuController]
})
export class HuxiuModule {}
