import { Module } from '@nestjs/common'
import { _360Service } from './_360.service'
import { _360Controller } from './_360.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { _360Entity } from './_360.entity'
import { _360Job } from './_360.job'
import { BullModule } from '@nestjs/bull'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { _360_QUEUE_NAME } from './_360.constant'

@Module({
  imports: [
    // TypeOrmModule.forFeature([_360Entity]),
    {
      ...BullModule.registerQueue({ name: _360_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: _360_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [_360Service, _360Job],
  exports: [_360Service, _360Job],
  controllers: [_360Controller]
})
export class _360Module {}
