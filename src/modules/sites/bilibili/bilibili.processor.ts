import { Process, Processor } from '@nestjs/bull'
import {
  BILIBILI_CACHE_KEY,
  BILIBILI_JOB_DEFINE,
  BILIBILI_QUEUE_NAME
} from './bilibili.constant'
import { Job } from 'bull'
import { RedisService } from 'src/shared/redis.service'
import { BilibiliService } from './bilibili.service'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(BILIBILI_QUEUE_NAME)
export class BilibiliProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly bilibiliService: BilibiliService
  ) {}

  @Process(BILIBILI_JOB_DEFINE.HOT.KEY)
  async hot(job: Job) {
    await job.progress(0)
    type Data = GetReturnDataType<typeof this.bilibiliService.hot>
    const { items, reminder, meta } = await this.bilibiliService.hot()
    await job.progress(50)
    const data: JobData<Data, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      reminder,
      meta
    }
    await job.update(data)
    await this.redisService.set(BILIBILI_CACHE_KEY.HOT, data)
    await job.progress(100)
    return await job.data
  }
  @Process(BILIBILI_JOB_DEFINE.WEEK.KEY)
  async week(job: Job) {
    await job.progress(0)
    type Data = GetReturnDataType<typeof this.bilibiliService.week>
    const { items, reminder } = await this.bilibiliService.week()
    await job.progress(50)
    const data: JobData<Data, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      reminder
    }
    await job.update(data)
    await this.redisService.set(BILIBILI_CACHE_KEY.WEEK, data)
    await job.progress(100)
    return await job.data
  }
  @Process(BILIBILI_JOB_DEFINE.RANK.KEY)
  async rank(job: Job) {
    await job.progress(0)
    type Data = GetReturnDataType<typeof this.bilibiliService.rank>
    const { items, reminder } = await this.bilibiliService.rank()
    await job.progress(50)
    const data: JobData<Data, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      reminder
    }
    await job.update(data)
    await this.redisService.set(BILIBILI_CACHE_KEY.RANK, data)
    await job.progress(100)
    return await job.data
  }
}
