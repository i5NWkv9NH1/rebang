import { Module } from '@nestjs/common'
import { _360Service } from './_360.service'
import { _360Controller } from './_360.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { _360Entity } from './_360.entity'
import { _360Task } from './_360.task'

@Module({
  imports: [TypeOrmModule.forFeature([_360Entity])],
  providers: [_360Service, _360Task],
  exports: [_360Service, _360Task],
  controllers: [_360Controller]
})
export class _360Module {}
