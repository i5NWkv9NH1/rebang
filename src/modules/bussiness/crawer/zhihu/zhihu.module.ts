import { Module } from '@nestjs/common'
import { ScraperModule } from 'src/common/abstracts/scrapy.module'
import { WebsiteModule } from '../../website/website.module'
import { ZHIHU_QUEUE_NAME } from './zhihu.constant'
import { ZhihuProcessor } from './zhihu.processor'
import { ZhihuService } from './zhihu.service'
import { ZhihuScrapy } from './zhihu.scrapy'

@Module({
  imports: [
    ScraperModule.register({
      queueName: ZHIHU_QUEUE_NAME,
      processor: ZhihuProcessor,
      service: ZhihuService,
      scrapy: ZhihuScrapy,
      modules: [WebsiteModule]
    })
  ]
})
export class ZhihuModule {}
