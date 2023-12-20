import { Module } from '@nestjs/common'
import { WeiboService } from './weibo.service'
import { WeiboController } from './weibo.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WeiboJob } from './weibo.job'
import { WeiboProcessor } from './weibo.processor'
import { BullModule } from '@nestjs/bull'
import { WEIBO_QUEUE_NAME } from './weibo.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: WEIBO_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: WEIBO_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [WeiboService, WeiboJob, WeiboProcessor],
  exports: [WeiboService, WeiboJob, WeiboProcessor],
  controllers: [WeiboController]
})
export class WeiboModule {}
