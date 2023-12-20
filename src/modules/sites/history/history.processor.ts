import { Process, Processor } from '@nestjs/bull'
import {
  HISTORY_CACHE_KEY,
  HISTORY_JOB_DEFINE,
  HISTORY_QUEUE_NAME
} from './history.constant'
import { RedisService } from 'src/shared/redis.service'
import { HistoryService } from './history.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(HISTORY_QUEUE_NAME)
export class HistoryProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly historyService: HistoryService
  ) {}

  @Process(HISTORY_JOB_DEFINE._360.KEY)
  async _360(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.historyService._360>
    const items = await this.historyService._360()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(HISTORY_CACHE_KEY._360, data)
    await job.progress(100)
    return await job.data
  }
}
