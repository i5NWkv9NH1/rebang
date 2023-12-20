import { Module } from '@nestjs/common'
import { XueqiuService } from './xueqiu.service'
import { XueqiuController } from './xueqiu.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { XueqiuJob } from './xueqiu.job'
import { XueqiuProcessor } from './xueqiu.processor'
import { BullModule } from '@nestjs/bull'
import { XUEQIU_QUEUE_NAME } from './xueqiu.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: XUEQIU_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: XUEQIU_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [XueqiuService, XueqiuJob, XueqiuProcessor],
  exports: [XueqiuService, XueqiuJob, XueqiuProcessor],
  controllers: [XueqiuController]
})
export class XueqiuModule {}
