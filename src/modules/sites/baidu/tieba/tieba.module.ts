import { Module } from '@nestjs/common'
import { TiebaService } from './tieba.service'
import { TiebaController } from './tieba.controller'
import { BullModule } from '@nestjs/bull'
import { TIEBA_QUEUE_NAME } from './tieba.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { TiebaJob } from './tieba.job'
import { TiebaProcessor } from './tieba.processor'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: TIEBA_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: TIEBA_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [TiebaService, TiebaJob, TiebaProcessor],
  exports: [TiebaService, TiebaJob, TiebaProcessor],
  controllers: [TiebaController]
})
export class TiebaModule {}
