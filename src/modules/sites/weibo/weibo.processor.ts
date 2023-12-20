import { Process, Processor } from '@nestjs/bull'
import {
  WEIBO_CACHE_KEY,
  WEIBO_JOB_DEFINE,
  WEIBO_QUEUE_NAME
} from './weibo.constant'
import { RedisService } from 'src/shared/redis.service'
import { WeiboService } from './weibo.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(WEIBO_QUEUE_NAME)
export class WeiboProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly weiboService: WeiboService
  ) {}

  @Process(WEIBO_JOB_DEFINE.HOT_SEARCH.KEY)
  async hotSearch(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.weiboService.hotsearch>
    const items = await this.weiboService.hotsearch()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(WEIBO_CACHE_KEY.HOT_SEARCH, data)
    await job.progress(100)
    return await job.data
  }
}
