import { Module } from '@nestjs/common'
import { BilibiliService } from './bilibili.service'
import { BilibiliController } from './bilibili.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BilibiliEntity } from './bilibili.entity'
import { BilibiliJob } from './bilibili.job'
import { BilibiliProcessor } from './bilibili.processor'
import { BullModule } from '@nestjs/bull'
import { BILIBILI_QUEUE_NAME } from './bilibili.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  // imports: [TypeOrmModule.forFeature([BilibiliEntity])],
  imports: [
    {
      ...BullModule.registerQueue({ name: BILIBILI_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: BILIBILI_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [BilibiliService, BilibiliJob, BilibiliProcessor],
  exports: [BilibiliService, BilibiliJob, BilibiliProcessor],
  controllers: [BilibiliController]
})
export class BilibiliModule {}
