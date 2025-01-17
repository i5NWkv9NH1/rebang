import { Module } from '@nestjs/common'
import { DouyinService } from './douyin.service'
import { DouyinController } from './douyin.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DouyinEntity } from './douyin.entity'
import { DouyinJob } from './douyin.job'
import { DouyinProcessor } from './douyin.processor'
import { BullModule } from '@nestjs/bull'
import { DOUYIN_QUEUE_NAME } from './douyin.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  // imports: [TypeOrmModule.forFeature([DouyinEntity])],
  imports: [
    {
      ...BullModule.registerQueue({ name: DOUYIN_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: DOUYIN_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [DouyinService, DouyinJob, DouyinProcessor],
  exports: [DouyinService, DouyinJob, DouyinProcessor],
  controllers: [DouyinController]
})
export class DouyinModule {}
