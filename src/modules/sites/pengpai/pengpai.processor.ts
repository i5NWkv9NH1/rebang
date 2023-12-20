import { Process, Processor } from '@nestjs/bull'
import {
  PENGPAI_CACHE_KEY,
  PENGPAI_JOB_DEFINE,
  PENGPAI_QUEUE_NAME
} from './pengpai.constant'
import { RedisService } from 'src/shared/redis.service'
import { PengpaiService } from './pengpai.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(PENGPAI_QUEUE_NAME)
export class PengpaiProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly pengpaiService: PengpaiService
  ) {}

  @Process(PENGPAI_JOB_DEFINE.HOT.KEY)
  async hot(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.pengpaiService.hot>
    const items = await this.pengpaiService.hot()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(PENGPAI_CACHE_KEY.HOT, data)
    await job.progress(100)
    return await job.data
  }
}
