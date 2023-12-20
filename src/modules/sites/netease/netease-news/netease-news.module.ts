import { Module } from '@nestjs/common'
import { NeteaseNewsService } from './netease-news.service'
import { NeteaseNewsController } from './netease-news.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NeteaseNewsJob } from './netease-news.job'
import { NeteaseNewsProcessor } from './netease-news.processor'
import { BullModule } from '@nestjs/bull'
import { NETEASE_NEWS_QUEUE_NAME } from './netease-news.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: NETEASE_NEWS_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: NETEASE_NEWS_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [NeteaseNewsService, NeteaseNewsJob, NeteaseNewsProcessor],
  exports: [NeteaseNewsService, NeteaseNewsJob, NeteaseNewsProcessor],
  controllers: [NeteaseNewsController]
})
export class NeteaseNewsModule {}
