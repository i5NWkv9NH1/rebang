import { Module } from '@nestjs/common'
import { JiandanService } from './jiandan.service'
import { JiandanController } from './jiandan.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JiandanEntity } from './jiandan.entity'
import { JiandanJob } from './jiandan.job'
import { JiandanProcessor } from './jiandan.processor'
import { BullModule } from '@nestjs/bull'
import { JIANDAN_QUEUE_NAME } from './jiandan.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: JIANDAN_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: JIANDAN_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [JiandanService, JiandanJob, JiandanProcessor],
  exports: [JiandanService, JiandanJob, JiandanProcessor],
  controllers: [JiandanController]
})
export class JiandanModule {}
