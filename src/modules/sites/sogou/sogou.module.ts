import { Module } from '@nestjs/common'
import { SogouService } from './sogou.service'
import { SogouController } from './sogou.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SogouJob } from './sogou.job'
import { SogouProcessor } from './sogou.processor'
import { BullModule } from '@nestjs/bull'
import { SOGOU_QUEUE_NAME } from './sogou.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: SOGOU_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: SOGOU_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [SogouService, SogouJob, SogouProcessor],
  exports: [SogouService, SogouJob, SogouProcessor],
  controllers: [SogouController]
})
export class SogouModule {}
