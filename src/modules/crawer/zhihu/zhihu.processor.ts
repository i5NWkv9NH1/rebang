/**
 * * description 爬虫逻辑后处理
 * * description 存入 redis
 * TODO: 数据清洗，存放数据库和全文搜索
 */
import { Processor } from '@nestjs/bullmq'
import {
  ZHIHU_INDEX_NAME,
  ZHIHU_QUEUE_NAME,
  ZhihuRedisKey
} from './zhihu.constant'
import { Job } from 'bullmq'
import { Logger } from '@nestjs/common'
import { ZhihuScrapy } from './zhihu.scrapy'
import { JobDefinitData } from 'src/@types'
import { PartScrapedService } from '../../bussiness/website/services/part-scraped.service'
import { SearchService } from 'src/shared/services/search.service'
import { RedisService } from 'src/shared/services/redis.service'
import { WorkerHostProcessor } from 'src/common/abstracts/worker-host-processor.abstract'

@Processor(ZHIHU_QUEUE_NAME)
export class ZhihuProcessor extends WorkerHostProcessor<ZhihuScrapy> {
  protected readonly logger = new Logger(ZhihuProcessor.name)

  constructor(
    search: SearchService,
    redis: RedisService,
    db: PartScrapedService,
    scrapy: ZhihuScrapy
  ) {
    super(ZHIHU_QUEUE_NAME, ZHIHU_INDEX_NAME, search, redis, db, scrapy, {
      searchableAttributes: ['title', 'subtitle'],
      distinctAttribute: 'id'
    })
  }

  async process(job: Job<JobDefinitData>, token?: string) {
    switch (job.name) {
      default:
        //* 开始爬虫
        const items = await this.scrapy.trend(job)
        //* 爬虫结束，返回爬虫结果作为 returnValue
        job.updateProgress(100)
        return items
    }
  }
}
