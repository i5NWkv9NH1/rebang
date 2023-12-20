import { Process, Processor } from '@nestjs/bull'
import {
  ZHIHU_DAILY_CACHE_KEY,
  ZHIHU_DAILY_JOB_DEFINE,
  ZHIHU_DAILY_QUEUE_NAME
} from './zhihu-daily.constant'
import { RedisService } from 'src/shared/redis.service'
import { ZhihuDailyService } from './zhihu-daily.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(ZHIHU_DAILY_QUEUE_NAME)
export class ZhihuDailyProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly zhihudailyService: ZhihuDailyService
  ) {}

  @Process(ZHIHU_DAILY_JOB_DEFINE.LATEST.KEY)
  async latest(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.zhihudailyService.latest>
    const items = await this.zhihudailyService.latest()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(ZHIHU_DAILY_CACHE_KEY.LATEST, data)
    await job.progress(100)
    return await job.data
  }
}
