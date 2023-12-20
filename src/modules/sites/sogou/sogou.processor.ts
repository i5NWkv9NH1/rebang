import { Process, Processor } from '@nestjs/bull'
import {
  SOGOU_CACHE_KEY,
  SOGOU_JOB_DEFINE,
  SOGOU_QUEUE_NAME
} from './sogou.constant'
import { RedisService } from 'src/shared/redis.service'
import { SogouService } from './sogou.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(SOGOU_QUEUE_NAME)
export class SogouProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly sogouService: SogouService
  ) {}

  @Process(SOGOU_JOB_DEFINE.HOT.KEY)
  async hot(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.sogouService.hot>
    const items = await this.sogouService.hot()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(SOGOU_CACHE_KEY.HOT, data)
    await job.progress(100)
    return await job.data
  }
}
