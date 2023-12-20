import { Process, Processor } from '@nestjs/bull'
import {
  AGEFANS_CACHE_KEY,
  AGEFANS_JOB_DEFINE,
  AGEFANS_QUEUE_NAME
} from './agefans.constant'
import { AgefansService } from './agefans.service'
import { RedisService } from 'src/shared/redis.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(AGEFANS_QUEUE_NAME)
export class AgefansProcessor {
  constructor(
    private readonly agefansService: AgefansService,
    private readonly redisService: RedisService
  ) {}

  @Process(AGEFANS_JOB_DEFINE.LATEST.KEY)
  async latest(job: Job) {
    await job.progress(0)
    type Data = GetReturnDataType<typeof this.agefansService.latest>
    const { items, meta } = await this.agefansService.latest()
    await job.progress(50)
    const data: JobData<Data, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      meta
    }
    await job.update(data)
    await this.redisService.set(AGEFANS_CACHE_KEY.LATEST, data)
    await job.progress(100)
    return await job.data
  }
}
