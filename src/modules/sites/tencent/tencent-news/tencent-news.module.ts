import { Module } from '@nestjs/common'
import { TencentNewsService } from './tencent-news.service'
import { TencentNewsController } from './tencent-news.controller'
import { TencentNewsJob } from './tencent-news.job'
import { TencentNewsProcessor } from './tencent-news.processor'
import { BullModule } from '@nestjs/bull'
import { TENCENT_NEWS_QUEUE_NAME } from './tencent-news.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: TENCENT_NEWS_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: TENCENT_NEWS_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [TencentNewsService, TencentNewsJob, TencentNewsProcessor],
  exports: [TencentNewsService, TencentNewsJob, TencentNewsProcessor],
  controllers: [TencentNewsController]
})
export class TencentNewsModule {}
