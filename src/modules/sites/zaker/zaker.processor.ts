import { Process, Processor } from '@nestjs/bull'
import {
  ZAKER_CACHE_KEY,
  ZAKER_JOB_DEFINE,
  ZAKER_QUEUE_NAME
} from './zaker.constant'
import { RedisService } from 'src/shared/redis.service'
import { ZakerService } from './zaker.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(ZAKER_QUEUE_NAME)
export class ZakerProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly zakerService: ZakerService
  ) {}

  @Process(ZAKER_JOB_DEFINE.HOT.KEY)
  async hot(job: Job) {
    await job.progress(0)
    const { items, meta } = await this.zakerService.hot('')
    await job.progress(50)
    const data: JobData<any, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      meta
    }
    await job.update(data)
    await this.redisService.set(ZAKER_CACHE_KEY.HOT, data)
    await job.progress(100)
    return await job.data
  }

  @Process(ZAKER_JOB_DEFINE.ONLYONE.KEY)
  async onlyone(job: Job) {
    await job.progress(0)
    const { items, meta } = await this.zakerService.onlyone('')
    await job.progress(50)
    const data: JobData<any, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      meta
    }
    await job.update(data)
    await this.redisService.set(ZAKER_CACHE_KEY.ONLYONE, data)
    await job.progress(100)
    return await job.data
  }
}
