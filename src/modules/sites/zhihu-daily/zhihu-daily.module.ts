import { Module } from '@nestjs/common'
import { ZhihuDailyService } from './zhihu-daily.service'
import { ZhihuDailyController } from './zhihu-daily.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ZhihuDailyEntity } from './zhihu-daily.entity'
import { ZhihuDailyTask } from './zhihu-daily.task'

@Module({
  imports: [TypeOrmModule.forFeature([ZhihuDailyEntity])],
  providers: [ZhihuDailyService, ZhihuDailyTask],
  exports: [ZhihuDailyService, ZhihuDailyTask],
  controllers: [ZhihuDailyController]
})
export class ZhihuDailyModule {}
