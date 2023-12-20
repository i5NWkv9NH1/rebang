import { Process, Processor } from '@nestjs/bull'
import {
  HUPU_CACHE_KEY,
  HUPU_JOB_DEFINE,
  HUPU_QUEUE_NAME,
  HUPU_TABS
} from './hupu.constant'
import { RedisService } from 'src/shared/redis.service'
import { HupuService } from './hupu.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(HUPU_QUEUE_NAME)
export class HupuProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly hupuService: HupuService
  ) {}

  @Process(HUPU_JOB_DEFINE.GAMBIA.KEY)
  async rank(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.hupuService.plate>
    const items = await this.hupuService.plate(HUPU_TABS.GAMBIA)
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(HUPU_CACHE_KEY.GAMBIA, data)
    await job.progress(100)
    return await job.data
  }
}
