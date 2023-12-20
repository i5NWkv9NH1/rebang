import { Process, Processor } from '@nestjs/bull'
import {
  HUXIU_CACHE_KEY,
  HUXIU_JOB_DEFINE,
  HUXIU_QUEUE_NAME
} from './huxiu.constant'
import { RedisService } from 'src/shared/redis.service'
import { HuxiuService } from './huxiu.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(HUXIU_QUEUE_NAME)
export class HuxiuProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly huxiuService: HuxiuService
  ) {}

  @Process(HUXIU_JOB_DEFINE.LATEST.KEY)
  async latest(job: Job) {
    await job.progress(0)
    type Data = GetReturnDataType<typeof this.huxiuService.latest>
    const { items, meta } = await this.huxiuService.latest()
    await job.progress(50)
    const data: JobData<Data, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      meta
    }
    await job.update(data)
    await this.redisService.set(HUXIU_CACHE_KEY.LATEST, data)
    await job.progress(100)
    return await job.data
  }

  @Process(HUXIU_JOB_DEFINE.TIMELINE.KEY)
  async timeline(job: Job) {
    await job.progress(0)
    type Data = GetReturnDataType<typeof this.huxiuService.timeline>
    const { items, meta } = await this.huxiuService.timeline()
    await job.progress(50)
    const data: JobData<Data, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      meta
    }
    await job.update(data)
    await this.redisService.set(HUXIU_CACHE_KEY.TIMELINE, data)
    await job.progress(100)
    return await job.data
  }

  @Process(HUXIU_JOB_DEFINE.EVENT.KEY)
  async event(job: Job) {
    await job.progress(0)
    type Data = GetReturnDataType<typeof this.huxiuService.event>
    const { items, meta } = await this.huxiuService.event()
    await job.progress(50)
    const data: JobData<Data, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      meta
    }
    await job.update(data)
    await this.redisService.set(HUXIU_CACHE_KEY.EVENT, data)
    await job.progress(100)
    return await job.data
  }
}
