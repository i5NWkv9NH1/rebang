import { Module } from '@nestjs/common'
import { HuxiuService } from './huxiu.service'
import { HuxiuController } from './huxiu.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HuxiuEntity } from './huxiu.entity'
import { HuxiuTask } from './huxiu.task'

@Module({
  imports: [TypeOrmModule.forFeature([HuxiuEntity])],
  providers: [HuxiuService, HuxiuTask],
  exports: [HuxiuService, HuxiuTask],
  controllers: [HuxiuController]
})
export class HuxiuModule {}
