import { Module } from '@nestjs/common'
import { WeiboService } from './weibo.service'
import { WeiboController } from './weibo.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WeiboEntity } from './weibo.entity'
import { WeiboTask } from './webo.task'

@Module({
  imports: [TypeOrmModule.forFeature([WeiboEntity])],
  providers: [WeiboService, WeiboTask],
  exports: [WeiboService, WeiboTask],
  controllers: [WeiboController]
})
export class WeiboModule {}
