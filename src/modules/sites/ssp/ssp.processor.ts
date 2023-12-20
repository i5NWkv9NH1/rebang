import { Process, Processor } from '@nestjs/bull'
import { SSP_CACHE_KEY, SSP_JOB_DEFINE, SSP_QUEUE_NAME } from './ssp.constant'
import { RedisService } from 'src/shared/redis.service'
import { SspService } from './ssp.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(SSP_QUEUE_NAME)
export class SspProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly sspService: SspService
  ) {}

  @Process(SSP_JOB_DEFINE.HOT.KEY)
  async hot(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.sspService.hot>
    const items = await this.sspService.hot()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(SSP_CACHE_KEY.HOT, data)
    await job.progress(100)
    return await job.data
  }

  @Process(SSP_JOB_DEFINE.RECOMMENT.KEY)
  async recomment(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.sspService.recomment>
    const items = await this.sspService.recomment()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(SSP_CACHE_KEY.RECOMMENT, data)
    await job.progress(100)
    return await job.data
  }
}
