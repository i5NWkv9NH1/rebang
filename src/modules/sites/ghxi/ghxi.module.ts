import { Module } from '@nestjs/common'
import { GhxiService } from './ghxi.service'
import { GhxiController } from './ghxi.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GhxiJob } from './ghxi.job'
import { GhxiProcessor } from './ghxi.processor'
import { BullModule } from '@nestjs/bull'
import { GHXI_QUEUE_NAME } from './ghxi.constant'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    {
      ...BullModule.registerQueue({ name: GHXI_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: GHXI_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [GhxiService, GhxiJob, GhxiProcessor],
  exports: [GhxiService, GhxiJob, GhxiProcessor],
  controllers: [GhxiController]
})
export class GhxiModule {}
