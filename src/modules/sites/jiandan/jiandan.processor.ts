import { Process, Processor } from '@nestjs/bull'
import {
  JIANDAN_CACHE_KEY,
  JIANDAN_JOB_DEFINE,
  JIANDAN_QUEUE_NAME
} from './jiandan.constant'
import { RedisService } from 'src/shared/redis.service'
import { JiandanService } from './jiandan.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(JIANDAN_QUEUE_NAME)
export class JiandanProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly jiandanService: JiandanService
  ) {}

  @Process(JIANDAN_JOB_DEFINE._4H.KEY)
  async _4h(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.jiandanService._4h>
    const items = await this.jiandanService._4h()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(JIANDAN_CACHE_KEY._4H, data)
    await job.progress(100)
    return await job.data
  }

  @Process(JIANDAN_JOB_DEFINE._3D.KEY)
  async _3d(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.jiandanService._3d>
    const items = await this.jiandanService._3d()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(JIANDAN_CACHE_KEY._3D, data)
    await job.progress(100)
    return await job.data
  }

  @Process(JIANDAN_JOB_DEFINE._7D.KEY)
  async _7d(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.jiandanService._7d>
    const items = await this.jiandanService._7d()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(JIANDAN_CACHE_KEY._7D, data)
    await job.progress(100)
    return await job.data
  }

  @Process(JIANDAN_JOB_DEFINE.TOP.KEY)
  async top(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.jiandanService.top>
    const items = await this.jiandanService.top()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(JIANDAN_CACHE_KEY.TOP, data)
    await job.progress(100)
    return await job.data
  }
  @Process(JIANDAN_JOB_DEFINE.TUCAO.KEY)
  async tucao(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.jiandanService.tucao>
    const items = await this.jiandanService.tucao()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(JIANDAN_CACHE_KEY.TUCAO, data)
    await job.progress(100)
    return await job.data
  }

  @Process(JIANDAN_JOB_DEFINE.COMMENTS.KEY)
  async comments(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.jiandanService.comments>
    const items = await this.jiandanService.comments()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(JIANDAN_CACHE_KEY.COMMENTS, data)
    await job.progress(100)
    return await job.data
  }

  @Process(JIANDAN_JOB_DEFINE.OOXX.KEY)
  async ooxx(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.jiandanService.ooxx>
    const items = await this.jiandanService.ooxx()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(JIANDAN_CACHE_KEY.OOXX, data)
    await job.progress(100)
    return await job.data
  }
}
