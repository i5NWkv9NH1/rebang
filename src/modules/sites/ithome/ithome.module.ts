import { Module } from '@nestjs/common'
import { ITHomeService } from './ithome.service'
import { ITHomeController } from './ithome.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ITHomeEntity } from './ithome.entity'
import { ITHomeJob } from './ithome.job'
import { ITHomeProcessor } from './ithome.processor'
import { BullModule } from '@nestjs/bull'
import { ITHOME_QUEUE_NAME } from './ithome.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: ITHOME_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: ITHOME_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [ITHomeService, ITHomeJob, ITHomeProcessor],
  exports: [ITHomeService, ITHomeJob, ITHomeProcessor],
  controllers: [ITHomeController]
})
export class ITHomeModule {}
