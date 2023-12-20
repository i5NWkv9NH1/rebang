import { Module } from '@nestjs/common'
import { AcFunService } from './acfun.service'
import { AcfunController } from './acfun.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AcFunEntity } from './acfun.entity'
import { SharedModule } from 'src/shared/shared.module'
import { AcFunJob } from './acfun.job'
import { AcFunProcessor } from './acfun.processor'
import { BullModule } from '@nestjs/bull'
import { ACFUN_QUEUE_NAME } from './acfun.constant'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { BullBoardModule } from '@bull-board/nestjs'

@Module({
  // imports: [TypeOrmModule.forFeature([AcFunEntity]), SharedModule],
  imports: [
    {
      ...BullModule.registerQueue({ name: ACFUN_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: ACFUN_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [AcFunService, AcFunJob, AcFunProcessor],
  exports: [AcFunService, AcFunJob, AcFunProcessor],
  controllers: [AcfunController]
})
export class AcfunModule {}
