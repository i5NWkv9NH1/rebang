import { Module } from '@nestjs/common'
import { YicaiService } from './yicai.service'
import { YicaiController } from './yicai.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { YicaiJob } from './yicai.job'
import { YicaiProcessor } from './yicai.processor'
import { BullModule } from '@nestjs/bull'
import { YICAI_QUEUE_NAME } from './yicai.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: YICAI_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: YICAI_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [YicaiService, YicaiJob, YicaiProcessor],
  exports: [YicaiService, YicaiJob, YicaiProcessor],
  controllers: [YicaiController]
})
export class YicaiModule {}
