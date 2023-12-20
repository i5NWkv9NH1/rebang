import { Module } from '@nestjs/common'
import { SspService } from './ssp.service'
import { SspController } from './ssp.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SspJob } from './ssp.job'
import { SspProcessor } from './ssp.processor'
import { BullModule } from '@nestjs/bull'
import { SSP_QUEUE_NAME } from './ssp.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: SSP_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: SSP_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [SspService, SspJob, SspProcessor],
  exports: [SspService, SspJob, SspProcessor],
  controllers: [SspController]
})
export class SspModule {}
