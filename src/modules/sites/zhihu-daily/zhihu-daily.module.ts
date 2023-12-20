import { Module } from '@nestjs/common'
import { ZhihuDailyService } from './zhihu-daily.service'
import { ZhihuDailyController } from './zhihu-daily.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ZhihuDailyJob } from './zhihu-daily.job'
import { ZhihuDailyProcessor } from './zhihu-daily.processor'
import { BullModule } from '@nestjs/bull'
import { ZHIHU_DAILY_QUEUE_NAME } from './zhihu-daily.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: ZHIHU_DAILY_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: ZHIHU_DAILY_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [ZhihuDailyService, ZhihuDailyJob, ZhihuDailyProcessor],
  exports: [ZhihuDailyService, ZhihuDailyJob, ZhihuDailyProcessor],
  controllers: [ZhihuDailyController]
})
export class ZhihuDailyModule {}
