import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { _36KEntity } from './_36k.entity'
import { _36KService } from './_36k.service'
import { _36KTask } from './_36k.task'
import { _36KController } from './_36k.controller'
import { BullModule } from '@nestjs/bull'
import { _36kProcessor } from './_36k.processor'

@Module({
  imports: [
    TypeOrmModule.forFeature([_36KEntity]),
    {
      ...BullModule.registerQueue({ name: '_36k' }),
      global: true
    }
  ],
  providers: [_36KService, _36KTask, _36kProcessor],
  exports: [_36KService, _36KTask, _36kProcessor],
  controllers: [_36KController]
})
export class _36KModule {}
