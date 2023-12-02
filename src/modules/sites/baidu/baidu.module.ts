import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaiduController } from './baidu.controller'
import { BaiduService } from './baidu.service'
import { BaiduTask } from './baidu.task'
import { BaiduEntity } from './baidu.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BaiduEntity])],
  providers: [BaiduService, BaiduTask],
  exports: [BaiduService, BaiduTask],
  controllers: [BaiduController]
})
export class BaiduModule {}
