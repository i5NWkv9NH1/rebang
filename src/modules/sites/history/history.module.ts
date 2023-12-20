import { Module } from '@nestjs/common'
import { HistoryService } from './history.service'
import { HistoryController } from './history.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HistoryEntity } from './history.entity'
import { HistoryJob } from './history.job'
import { HistoryProcessor } from './history.processor'
import { BullModule } from '@nestjs/bull'
import { HISTORY_QUEUE_NAME } from './history.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: HISTORY_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: HISTORY_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [HistoryService, HistoryJob, HistoryProcessor],
  exports: [HistoryService, HistoryJob, HistoryProcessor],
  controllers: [HistoryController]
})
export class HistoryModule {}
