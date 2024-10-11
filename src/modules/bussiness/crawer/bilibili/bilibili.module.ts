import { Module } from '@nestjs/common'
import { BilibiliScrapy } from './bilibili.scrapy'
import { BilibiliService } from './bilibili.service'
import { BilibiliProcessor } from './bilibili.processor'
import { BILIBILI_QUEUE_NAME } from './bilibili.constant'
import { ScraperModule } from 'src/common/abstracts/scrapy.module'
import { WebsiteModule } from '../../website/website.module'

@Module({
  imports: [
    ScraperModule.register({
      queueName: BILIBILI_QUEUE_NAME,
      processor: BilibiliProcessor,
      service: BilibiliService,
      scrapy: BilibiliScrapy,
      modules: [WebsiteModule]
    })
  ]
})
export class BilibiliModule {}
