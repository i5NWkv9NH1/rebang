import { Module } from '@nestjs/common'
import { XueqiuService } from './xueqiu.service'
import { XueqiuController } from './xueqiu.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { XueqiuEntity } from './xueqiu.entity'
import { XueqiuTask } from './xueqiu.task'

@Module({
  imports: [TypeOrmModule.forFeature([XueqiuEntity])],
  providers: [XueqiuService, XueqiuTask],
  exports: [XueqiuService, XueqiuTask],
  controllers: [XueqiuController]
})
export class XueqiuModule {}
