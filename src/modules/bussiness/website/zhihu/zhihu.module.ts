import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ZhihuProcessor } from './zhihu.processor'
import { ZhihuService } from './zhihu.service'
import { ZhihuScrapy } from './zhihu.scrapy'
import { ZHIHU_QUEUE } from './zhihu.constant'
import { WebsiteModule } from '../website.module'

@Module({
  imports: [
    // PlaywrightModule.forFeature(['知乎热搜']),
    BullModule.registerQueue({
      name: ZHIHU_QUEUE
    }),
    WebsiteModule
  ],
  providers: [ZhihuProcessor, ZhihuService, ZhihuScrapy]
})
export class ZhihuModule {}
