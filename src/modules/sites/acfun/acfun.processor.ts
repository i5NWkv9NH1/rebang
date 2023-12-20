import { Process, Processor } from '@nestjs/bull'
import {
  ACFUN_CACHE_KEY,
  ACFUN_JOB_DEFINE,
  ACFUN_QUEUE_NAME
} from './acfun.constant'
import { RedisService } from 'src/shared/redis.service'
import { AcFunService } from './acfun.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(ACFUN_QUEUE_NAME)
export class AcFunProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly acfunService: AcFunService
  ) {}

  @Process(ACFUN_JOB_DEFINE.RANK.DAY.KEY)
  async day(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.acfunService.day>
    const items = await this.acfunService.day()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(ACFUN_CACHE_KEY.RANK.DAY, data)
    await job.progress(100)
    return await job.data
  }
  @Process(ACFUN_JOB_DEFINE.RANK.THREE_DAYS.KEY)
  async threedays(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.acfunService.threedays>
    const items = await this.acfunService.threedays()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(ACFUN_CACHE_KEY.RANK.THREE_DAYS, data)
    await job.progress(100)
    return await job.data
  }
  @Process(ACFUN_JOB_DEFINE.RANK.WEEK.KEY)
  async week(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.acfunService.week>
    const items = await this.acfunService.week()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(ACFUN_CACHE_KEY.RANK.WEEK, data)
    await job.progress(100)
    return await job.data
  }
}
