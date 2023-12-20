import { Module } from '@nestjs/common'
import { ShadiaonewsService } from './shadiaonews.service'
import { ShadiaonewsController } from './shadiaonews.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShadiaonewsJob } from './shadiaonews.job'
import { ShadiaonewsProcessor } from './shadiaonews.processor'
import { BullModule } from '@nestjs/bull'
import { SHADIAONEWS_QUEUE_NAME } from './shadiaonews.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: SHADIAONEWS_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: SHADIAONEWS_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [ShadiaonewsService, ShadiaonewsJob, ShadiaonewsProcessor],
  exports: [ShadiaonewsService, ShadiaonewsJob, ShadiaonewsProcessor],
  controllers: [ShadiaonewsController]
})
export class ShadiaonewsModule {}
