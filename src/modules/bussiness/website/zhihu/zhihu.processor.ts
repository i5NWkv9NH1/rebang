/**
 * * description 爬虫逻辑后处理
 * * description 存入 redis
 * TODO: 数据清洗，存放数据库和全文搜索
 */
import { Processor } from '@nestjs/bullmq'
import { ZHIHU_QUEUE } from './zhihu.constant'
import { Job } from 'bullmq'
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { WorkerHostProcessor } from 'src/shared/abstracts/work-event.processor'
import { ZhihuScrapy } from './zhihu.scrapy'
import { RedisData, JobDefinitData } from 'src/@types'
import { PartScrapedService } from '../services/part-scraped.service'
import { SearchService } from 'src/shared/services/search.service'
import { RedisService } from 'src/shared/services/redis.service'
import { CronExpression } from '@nestjs/schedule'

@Injectable()
@Processor(ZHIHU_QUEUE)
export class ZhihuProcessor extends WorkerHostProcessor {
  protected readonly logger = new Logger(ZhihuProcessor.name)

  constructor(
    private readonly searchService: SearchService,
    private readonly scrapy: ZhihuScrapy,
    private readonly partScrapedService: PartScrapedService,
    private readonly redisService: RedisService
  ) {
    super()
  }

  async process(job: Job<JobDefinitData>, token?: string) {
    const { config } = job.data
    const { redisExpire, redisKey } = config
    try {
      switch (job.name) {
        default:
          const items = await this.scrapy.trend(job)
          const redisData = <RedisData>{ job, items }
          await this.redisService.set(redisKey, redisData, redisExpire)
          job.updateProgress(100)
          return job
      }
      return job
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
