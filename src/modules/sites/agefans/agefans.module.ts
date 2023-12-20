import { Module } from '@nestjs/common'
import { AgefansService } from './agefans.service'
import { AgefansController } from './agefans.controller'
import { BullModule } from '@nestjs/bull'
import { AGEFANS_QUEUE_NAME } from './agefans.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: AGEFANS_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: AGEFANS_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [AgefansService],
  controllers: [AgefansController]
})
export class AgefansModule {}
