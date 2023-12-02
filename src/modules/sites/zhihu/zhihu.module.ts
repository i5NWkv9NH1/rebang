import { Module } from '@nestjs/common'
import { ZhihuService } from './zhihu.service'
import { ZhihuController } from './zhihu.controller'
import { ZhihuTask } from './zhihu.task'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ZhihuEntity } from './zhihu.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ZhihuEntity])],
  providers: [ZhihuService, ZhihuTask],
  exports: [ZhihuService, ZhihuTask],
  controllers: [ZhihuController]
})
export class ZhihuModule {}
