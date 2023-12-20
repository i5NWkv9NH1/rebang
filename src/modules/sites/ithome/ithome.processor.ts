import { Process, Processor } from '@nestjs/bull'
import {
  ITHOME_CACHE_KEY,
  ITHOME_JOB_DEFINE,
  ITHOME_QUEUE_NAME
} from './ithome.constant'
import { RedisService } from 'src/shared/redis.service'
import { ITHomeService } from './ithome.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(ITHOME_QUEUE_NAME)
export class ITHomeProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly ithomeService: ITHomeService
  ) {}

  @Process(ITHOME_JOB_DEFINE.RANK.KEY)
  async rank(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.ithomeService.hot>
    const items = await this.ithomeService.hot()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(ITHOME_CACHE_KEY.HOT, data)
    await job.progress(100)
    return await job.data
  }
}
