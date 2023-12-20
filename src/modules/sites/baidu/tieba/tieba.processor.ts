import { Process, Processor } from '@nestjs/bull'
import {
  TIEBA_CACHE_KEY,
  TIEBA_JOB_DEFINE,
  TIEBA_QUEUE_NAME
} from './tieba.constant'
import { RedisService } from 'src/shared/redis.service'
import { TiebaService } from './tieba.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(TIEBA_QUEUE_NAME)
export class TiebaProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly tiebaService: TiebaService
  ) {}

  @Process(TIEBA_JOB_DEFINE.TOPIC_LIST.KEY)
  async topicList(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.tiebaService.topicList>
    const items = await this.tiebaService.topicList()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(TIEBA_CACHE_KEY.TOPIC_LIST, data)
    await job.progress(100)
    return await job.data
  }
}
