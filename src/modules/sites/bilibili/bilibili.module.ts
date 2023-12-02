import { Module } from '@nestjs/common'
import { BilibiliService } from './bilibili.service'
import { BilibiliController } from './bilibili.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BilibiliEntity } from './bilibili.entity'
import { BilibiliTask } from './bilibili.task'

@Module({
  imports: [TypeOrmModule.forFeature([BilibiliEntity])],
  providers: [BilibiliService, BilibiliTask],
  exports: [BilibiliService, BilibiliTask],
  controllers: [BilibiliController]
})
export class BilibiliModule {}
