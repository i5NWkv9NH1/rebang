import { Module } from '@nestjs/common'
import { PearVideoService } from './pearvideo.service'
import { PearVideoController } from './pearvideo.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PearVideoJob } from './pearvideo.job'
import { PearVideoProcessor } from './pearvideo.processor'
import { BullModule } from '@nestjs/bull'
import { PEAR_VIDEO_QUEUE_NAME } from './pearvideo.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: PEAR_VIDEO_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: PEAR_VIDEO_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [PearVideoService, PearVideoJob, PearVideoProcessor],
  exports: [PearVideoService, PearVideoJob, PearVideoProcessor],
  controllers: [PearVideoController]
})
export class PearVideoModule {}
