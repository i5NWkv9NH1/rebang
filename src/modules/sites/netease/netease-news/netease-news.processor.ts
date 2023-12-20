import { Process, Processor } from '@nestjs/bull'
import {
  NETEASE_NEWS_CACHE_KEY,
  NETEASE_NEWS_JOB_DEFINE,
  NETEASE_NEWS_QUEUE_NAME
} from './netease-news.constant'
import { RedisService } from 'src/shared/redis.service'
import { NeteaseNewsService } from './netease-news.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(NETEASE_NEWS_QUEUE_NAME)
export class NeteaseNewsProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly neteaseNewsService: NeteaseNewsService
  ) {}

  @Process(NETEASE_NEWS_JOB_DEFINE.HOT.KEY)
  async hot(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.neteaseNewsService.hot>
    const items = await this.neteaseNewsService.hot()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(NETEASE_NEWS_CACHE_KEY.HOT, data)
    await job.progress(100)
    return await job.data
  }

  @Process(NETEASE_NEWS_JOB_DEFINE.COMMENT.KEY)
  async comment(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.neteaseNewsService.comment>
    const items = await this.neteaseNewsService.comment()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(NETEASE_NEWS_CACHE_KEY.COMMENT, data)
    await job.progress(100)
    return await job.data
  }

  @Process(NETEASE_NEWS_JOB_DEFINE.SEARCH.KEY)
  async search(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.neteaseNewsService.search>
    const items = await this.neteaseNewsService.search()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(NETEASE_NEWS_CACHE_KEY.SEARCH, data)
    await job.progress(100)
    return await job.data
  }

  @Process(NETEASE_NEWS_JOB_DEFINE.VIDEO.KEY)
  async video(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.neteaseNewsService.video>
    const items = await this.neteaseNewsService.video()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(NETEASE_NEWS_CACHE_KEY.VIDEO, data)
    await job.progress(100)
    return await job.data
  }

  @Process(NETEASE_NEWS_JOB_DEFINE.TOPIC.KEY)
  async topic(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.neteaseNewsService.hot>
    const items = await this.neteaseNewsService.topic()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(NETEASE_NEWS_CACHE_KEY.TOPIC, data)
    await job.progress(100)
    return await job.data
  }
}
