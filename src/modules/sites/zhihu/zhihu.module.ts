import { Module } from '@nestjs/common'
import { ZhihuService } from './zhihu.service'
import { ZhihuController } from './zhihu.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ZhihuJob } from './zhihu.job'
import { ZhihuProcessor } from './zhihu.processor'
import { BullModule } from '@nestjs/bull'
import { ZHIHU_QUEUE_NAME } from './zhihu.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: ZHIHU_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: ZHIHU_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [ZhihuService, ZhihuJob, ZhihuProcessor],
  exports: [ZhihuService, ZhihuJob, ZhihuProcessor],
  controllers: [ZhihuController]
})
export class ZhihuModule {}
