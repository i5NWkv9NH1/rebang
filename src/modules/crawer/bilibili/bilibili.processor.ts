import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import {
  BILIBILI_INDEX_NAME,
  BILIBILI_QUEUE_NAME,
  BilibiliJobName
} from './bilibili.constant'
import { Injectable, Logger } from '@nestjs/common'
import { Job } from 'bullmq'
import { SearchService } from 'src/shared/services/search.service'
import { BilibiliScrapy } from './bilibili.scrapy'
import { JobDefinitData, RedisData } from 'src/@types'
import { RedisService } from 'src/shared/services/redis.service'
import { PartScrapedService } from '../../bussiness/website/services/part-scraped.service'
import { WorkerHostProcessor } from 'src/common/abstracts/worker-host.processor'

@Processor(BILIBILI_QUEUE_NAME)
export class BilibiliProcessor extends WorkerHostProcessor<BilibiliScrapy> {
  protected readonly logger = new Logger(BilibiliProcessor.name)

  constructor(
    search: SearchService,
    redis: RedisService,
    scrapy: BilibiliScrapy,
    db: PartScrapedService
  ) {
    super(BILIBILI_QUEUE_NAME, BILIBILI_INDEX_NAME, search, redis, db, scrapy, {
      searchableAttributes: ['title', 'subtitle', 'author.name'],
      distinctAttribute: 'id'
    })
  }

  async process(job: Job<JobDefinitData>, token?: string): Promise<any> {
    switch (job.name) {
      case BilibiliJobName.Rank:
        return await this.scrapy.rank(job)
      case BilibiliJobName.Week:
        return await this.scrapy.week(job)
      case BilibiliJobName.Hot:
        return await this.scrapy.hot(job)
      case BilibiliJobName.Rec:
        return await this.scrapy.rec(job)
      case BilibiliJobName.Search:
        return await this.scrapy.search(job)
      case BilibiliJobName.Shop:
        return await this.scrapy.shop(job)
    }
  }
}
