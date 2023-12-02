import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { _36KEntity } from './_36k.entity'
import { _36KService } from './_36k.service'
import { _36KTask } from './_36k.task'
import { _36KController } from './_36k.controller'

@Module({
  imports: [TypeOrmModule.forFeature([_36KEntity])],
  providers: [_36KService, _36KTask],
  exports: [_36KService, _36KTask],
  controllers: [_36KController]
})
export class _36KModule {}
