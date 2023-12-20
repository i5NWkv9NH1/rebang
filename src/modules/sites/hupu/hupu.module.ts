import { Module } from '@nestjs/common'
import { HupuService } from './hupu.service'
import { HupuController } from './hupu.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HupuEntity } from './hupu.entity'
import { HupuTask } from './hupu.task'

@Module({
  // imports: [TypeOrmModule.forFeature([HupuEntity])],
  providers: [HupuService, HupuTask],
  exports: [HupuService, HupuTask],
  controllers: [HupuController]
})
export class HupuModule {}
