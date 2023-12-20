import { Process, Processor } from '@nestjs/bull'
import {
  SHADIAONEWS_CACHE_KEY,
  SHADIAONEWS_JOB_DEFINE,
  SHADIAONEWS_QUEUE_NAME
} from './shadiaonews.constant'
import { RedisService } from 'src/shared/redis.service'
import { ShadiaonewsService } from './shadiaonews.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(SHADIAONEWS_QUEUE_NAME)
export class ShadiaonewsProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly shadiaonewsService: ShadiaonewsService
  ) {}

  @Process(SHADIAONEWS_JOB_DEFINE.MAIN.KEY)
  async hot(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.shadiaonewsService.start>
    const items = await this.shadiaonewsService.start()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(SHADIAONEWS_CACHE_KEY.MAIN, data)
    await job.progress(100)
    return await job.data
  }
}
