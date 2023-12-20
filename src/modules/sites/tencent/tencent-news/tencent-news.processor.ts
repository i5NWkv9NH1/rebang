import { Process, Processor } from '@nestjs/bull'
import {
  TENCENT_NEWS_CACHE_KEY,
  TENCENT_NEWS_JOB_DEFINE,
  TENCENT_NEWS_QUEUE_NAME
} from './tencent-news.constant'
import { RedisService } from 'src/shared/redis.service'
import { TencentNewsService } from './tencent-news.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(TENCENT_NEWS_QUEUE_NAME)
export class TencentNewsProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly tencentnewsService: TencentNewsService
  ) {}

  @Process(TENCENT_NEWS_JOB_DEFINE.HOT_QUESTION_LIST.KEY)
  async questions(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.tencentnewsService.questions>
    const items = await this.tencentnewsService.questions()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(
      TENCENT_NEWS_CACHE_KEY.HOT_QUESTION_LIST,
      data,
      300
    )
    await job.progress(100)
    return await job.data
  }

  @Process(TENCENT_NEWS_JOB_DEFINE.HOT_RANK_LIST.KEY)
  async rank(job: Job) {
    await job.progress(0)
    type Data = GetReturnDataType<typeof this.tencentnewsService.rank>
    const { items, meta } = await this.tencentnewsService.rank()
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
    await this.redisService.set(TENCENT_NEWS_CACHE_KEY.HOT_RANK_LIST, data)
    await job.progress(100)
    return await job.data
  }
}
