import { Process, Processor } from '@nestjs/bull'
import {
  DOUYIN_CACHE_KEY,
  DOUYIN_JOB_DEFINE,
  DOUYIN_QUEUE_NAME
} from './douyin.constant'
import { RedisService } from 'src/shared/redis.service'
import { DouyinService } from './douyin.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(DOUYIN_QUEUE_NAME)
export class DouyinProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly douyinService: DouyinService
  ) {}

  @Process(DOUYIN_JOB_DEFINE.HOT.KEY)
  async hot(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.douyinService.hot>
    const items = await this.douyinService.hot()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(DOUYIN_CACHE_KEY.HOT, data)
    await job.progress(100)
    return await job.data
  }
}
