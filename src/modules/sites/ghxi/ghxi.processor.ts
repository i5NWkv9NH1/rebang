import { Process, Processor } from '@nestjs/bull'
import {
  GHXI_CACHE_KEY,
  GHXI_JOB_DEFINE,
  GHXI_QUEUE_NAME
} from './ghxi.constant'
import { RedisService } from 'src/shared/redis.service'
import { GhxiService } from './ghxi.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(GHXI_QUEUE_NAME)
export class GhxiProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly ghxiService: GhxiService
  ) {}

  @Process(GHXI_JOB_DEFINE.LATEST.KEY)
  async latest(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.ghxiService.latest>
    const items = await this.ghxiService.latest()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(GHXI_CACHE_KEY.LATEST, data)
    await job.progress(100)
    return await job.data
  }

  @Process(GHXI_JOB_DEFINE.PC.KEY)
  async pc(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.ghxiService.pc>
    const items = await this.ghxiService.pc()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(GHXI_CACHE_KEY.PC, data)
    await job.progress(100)
    return await job.data
  }

  @Process(GHXI_JOB_DEFINE.ANDROID.KEY)
  async android(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.ghxiService.android>
    const items = await this.ghxiService.android()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(GHXI_CACHE_KEY.ANDROID, data)
    await job.progress(100)
    return await job.data
  }
}
