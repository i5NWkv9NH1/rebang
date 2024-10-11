import { Module } from '@nestjs/common'
import { ZhihuModule } from './zhihu/zhihu.module'
import { BilibiliModule } from './bilibili/bilibili.module'

@Module({
  imports: [BilibiliModule, ZhihuModule]
})
export class CrawerModule {}
