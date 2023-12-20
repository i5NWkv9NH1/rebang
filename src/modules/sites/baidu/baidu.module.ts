import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaiduController } from './baidu.controller'
import { BaiduService } from './baidu.service'
import { TiebaModule } from './tieba/tieba.module'
import { BullModule } from '@nestjs/bull'
import { BullBoardModule } from '@bull-board/nestjs'
import { BAIDU_QUEUE_NAME } from './baidu.constant'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { BaiduJob } from './baidu.job'
import { BaiduProcessor } from './baidu.processor'

@Module({
  imports: [
    TiebaModule,
    {
      ...BullModule.registerQueue({ name: BAIDU_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: BAIDU_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [BaiduService, BaiduJob, BaiduProcessor],
  exports: [BaiduService, BaiduJob, BaiduProcessor],
  controllers: [BaiduController]
})
export class BaiduModule {}
