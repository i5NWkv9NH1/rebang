import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq'
import { Logger, OnModuleInit } from '@nestjs/common'
import { Job } from 'bullmq'
import { Settings } from 'meilisearch'
import { JobDefinitData, RedisData } from 'src/@types'
import { PartScraped } from 'src/modules/bussiness/website/entities/part-scraped.entity'
import { PartScrapedService } from 'src/modules/bussiness/website/services/part-scraped.service'
import { RedisService } from 'src/shared/services/redis.service'
import { SearchService } from 'src/shared/search/search.service'

export abstract class WorkerHostProcessor<T> extends WorkerHost {
  protected abstract readonly logger: Logger

  constructor(
    protected readonly queueName: string,
    protected readonly indexName: string,
    protected readonly search: SearchService,
    protected readonly redis: RedisService,
    protected readonly db: PartScrapedService,
    protected readonly scrapy: T,
    protected readonly indexSettings: Settings
  ) {
    super()
  }

  async onModuleInit() {
    await this.search.createIndex(this.indexName)
  }

  abstract process<T = any>(
    job: Job<JobDefinitData>,
    token?: string
  ): Promise<T[]>

  @OnWorkerEvent('completed')
  async onCompelete(job: Job<JobDefinitData, RedisData['items']>) {
    const {
      returnvalue,
      data: { part, config }
    } = job
    //* 爬虫数据
    //* 数据库保存的任务配置
    //* 存入 redis，需要存放 lastFetchTime (job.finishedAt) 作为爬虫完成的时间
    const redisData = <RedisData>{
      items: returnvalue,
      job: job.asJSON(),
      part,
      config
    }
    await this.redis.set(config.redisKey, redisData)

    //* 数据对比，如果存在重复的则不插入
    for await (const item of returnvalue) {
      const { id, ...args } = item
      const existIteminDb = await this.db.findOneByTitle(part.name, item.title)
      if (existIteminDb) {
        await this.db.update(existIteminDb.id, { ...args })
        await this.search.updateDocuments(this.indexName, [
          { id: existIteminDb.id, ...args }
        ])
      } else {
        await this.db.create({ ...item, part })
        await this.search.addDocuments(this.indexName, [item])
      }
    }
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    const { id, name, progress } = job
    this.logger.log(`Job id: ${id}, name: ${name} completes ${progress}%`)
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    const { id, name, queueName, failedReason } = job
    this.logger.error(
      `Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`
    )
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    const { id, name, queueName, timestamp } = job
    const startTime = timestamp ? new Date(timestamp).toISOString() : ''
    this.logger.log(
      `Job id: ${id}, name: ${name} starts in queue ${queueName} on ${startTime}.`
    )
  }
}
