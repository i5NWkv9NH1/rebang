import { Process, Processor } from '@nestjs/bull'
import {
  TOUTIAO_CACHE_KEY,
  TOUTIAO_JOB_DEFINE,
  TOUTIAO_QUEUE_NAME
} from './toutiao.constant'
import { RedisService } from 'src/shared/redis.service'
import { ToutiaoService } from './toutiao.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(TOUTIAO_QUEUE_NAME)
export class ToutiaoProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly toutiaoService: ToutiaoService
  ) {}

  @Process(TOUTIAO_JOB_DEFINE.HOT.KEY)
  async hot(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.toutiaoService.hot>
    const items = await this.toutiaoService.hot()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(TOUTIAO_CACHE_KEY.HOT, data)
    await job.progress(100)
    return await job.data
  }
}
