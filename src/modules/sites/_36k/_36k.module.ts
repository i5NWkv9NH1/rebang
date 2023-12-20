import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { _36KEntity } from './_36k.entity'
import { _36KService } from './_36k.service'
import { _36KJob } from './_36k.job'
import { _36KController } from './_36k.controller'
import { BullModule } from '@nestjs/bull'
import { _36kProcessor } from './_36k.processor'
import { BullBoardModule } from '@bull-board/nestjs'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { _36K_QUEUE_NAME } from './_36k.constant'

@Module({
  imports: [
    // TypeOrmModule.forFeature([_36KEntity]),
    {
      ...BullModule.registerQueue({ name: _36K_QUEUE_NAME }),
      global: true
    },
    BullBoardModule.forFeature({
      name: _36K_QUEUE_NAME,
      adapter: BullAdapter
    })
  ],
  providers: [_36KService, _36KJob, _36kProcessor],
  controllers: [_36KController],
  exports: [_36KService, _36KJob, _36kProcessor]
})
export class _36KModule {}
