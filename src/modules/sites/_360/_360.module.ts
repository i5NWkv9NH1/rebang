import { Module } from '@nestjs/common'
import { _360Service } from './_360.service'
import { _360Controller } from './_360.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { _360Entity } from './_360.entity'
import { _360Task } from './_360.task'
import { BullModule } from '@nestjs/bull'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'

@Module({
  imports: [
    // TypeOrmModule.forFeature([_360Entity]),
    {
      ...BullModule.registerQueue({ name: '_360' }),
      global: true
    },
    BullBoardModule.forFeature({
      name: '_360',
      adapter: BullAdapter
    })
  ],
  providers: [_360Service, _360Task],
  exports: [_360Service, _360Task],
  controllers: [_360Controller]
})
export class _360Module {}
