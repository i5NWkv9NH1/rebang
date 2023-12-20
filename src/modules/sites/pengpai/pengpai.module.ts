import { Module } from '@nestjs/common'
import { PengpaiService } from './pengpai.service'
import { PengpaiController } from './pengpai.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PengpaiJob } from './pengpai.job'
import { PengpaiProcessor } from './pengpai.processor'
import { BullModule } from '@nestjs/bull'
import { PENGPAI_QUEUE_NAME } from './pengpai.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: PENGPAI_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: PENGPAI_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [PengpaiService, PengpaiJob, PengpaiProcessor],
  exports: [PengpaiService, PengpaiJob, PengpaiProcessor],
  controllers: [PengpaiController]
})
export class PengpaiModule {}
