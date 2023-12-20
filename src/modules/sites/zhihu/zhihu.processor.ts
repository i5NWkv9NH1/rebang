import { Process, Processor } from '@nestjs/bull'
import {
  ZHIHU_CACHE_KEY,
  ZHIHU_JOB_DEFINE,
  ZHIHU_QUEUE_NAME
} from './zhihu.constant'
import { RedisService } from 'src/shared/redis.service'
import { ZhihuService } from './zhihu.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(ZHIHU_QUEUE_NAME)
export class ZhihuProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly zhihuService: ZhihuService
  ) {}

  @Process(ZHIHU_JOB_DEFINE.BILLBOARD.KEY)
  async billboard(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.zhihuService.billboard>
    const items = await this.zhihuService.billboard()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(ZHIHU_CACHE_KEY.BILLBOARD, data)
    await job.progress(100)
    return await job.data
  }
}
