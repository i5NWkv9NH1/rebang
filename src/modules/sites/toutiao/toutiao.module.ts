import { Module } from '@nestjs/common'
import { ToutiaoService } from './toutiao.service'
import { ToutiaoController } from './toutiao.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ToutiaoJob } from './toutiao.job'
import { ToutiaoProcessor } from './toutiao.processor'
import { BullModule } from '@nestjs/bull'
import { TOUTIAO_QUEUE_NAME } from './toutiao.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: TOUTIAO_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: TOUTIAO_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [ToutiaoService, ToutiaoJob, ToutiaoProcessor],
  exports: [ToutiaoService, ToutiaoJob, ToutiaoProcessor],
  controllers: [ToutiaoController]
})
export class ToutiaoModule {}
