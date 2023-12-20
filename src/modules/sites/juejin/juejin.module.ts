import { Module } from '@nestjs/common'
import { JuejinService } from './juejin.service'
import { JuejinController } from './juejin.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JuejinEntity } from './juejin.entity'
import { JuejinJob } from './juejin.job'
import { JuejinProcessor } from './juejin.processor'
import { BullModule } from '@nestjs/bull'
import { JUEJIN_QUEUE_NAME } from './juejin.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: JUEJIN_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: JUEJIN_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [JuejinService, JuejinJob, JuejinProcessor],
  exports: [JuejinService, JuejinJob, JuejinProcessor],
  controllers: [JuejinController]
})
export class JuejinModule {}
