import { Process, Processor } from '@nestjs/bull'
import {
  BAIDU_CACHE_KEY,
  BAIDU_JOB_DEFINE,
  BAIDU_QUEUE_NAME,
  BaiduRankTab
} from './baidu.constant'
import { BaiduService } from './baidu.service'
import { RedisService } from 'src/shared/redis.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(BAIDU_QUEUE_NAME)
export class BaiduProcessor {
  private readonly defineJobs = [
    {
      key: BAIDU_JOB_DEFINE.REALTIME.KEY,
      name: BAIDU_JOB_DEFINE.REALTIME.NAME,
      scope: BAIDU_JOB_DEFINE.REALTIME.SCOPE,
      cron: BAIDU_JOB_DEFINE.REALTIME.CRON
    },
    {
      key: BAIDU_JOB_DEFINE.NOVEL.KEY,
      name: BAIDU_JOB_DEFINE.NOVEL.NAME,
      scope: BAIDU_JOB_DEFINE.NOVEL.SCOPE,
      cron: BAIDU_JOB_DEFINE.NOVEL.CRON
    },
    {
      key: BAIDU_JOB_DEFINE.MOVIE.KEY,
      name: BAIDU_JOB_DEFINE.MOVIE.NAME,
      scope: BAIDU_JOB_DEFINE.MOVIE.SCOPE,
      cron: BAIDU_JOB_DEFINE.MOVIE.CRON
    },
    {
      key: BAIDU_JOB_DEFINE.TELEPLAY.KEY,
      name: BAIDU_JOB_DEFINE.TELEPLAY.NAME,
      scope: BAIDU_JOB_DEFINE.TELEPLAY.SCOPE,
      cron: BAIDU_JOB_DEFINE.TELEPLAY.CRON
    },
    {
      key: BAIDU_JOB_DEFINE.CAR.KEY,
      name: BAIDU_JOB_DEFINE.CAR.NAME,
      scope: BAIDU_JOB_DEFINE.CAR.SCOPE,
      cron: BAIDU_JOB_DEFINE.CAR.CRON
    },
    {
      key: BAIDU_JOB_DEFINE.GAME.KEY,
      name: BAIDU_JOB_DEFINE.GAME.NAME,
      scope: BAIDU_JOB_DEFINE.GAME.SCOPE,
      cron: BAIDU_JOB_DEFINE.GAME.CRON
    }
  ]

  constructor(
    private readonly baiduService: BaiduService,
    private readonly redisService: RedisService
  ) {}

  @Process(BAIDU_JOB_DEFINE.REALTIME.KEY)
  async realtime(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this.baiduService.rank>
    const items = await this.baiduService.rank(BaiduRankTab.REALTIME)
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(BAIDU_CACHE_KEY.REALTIME, data)
    await job.progress(100)
    return await job.data
  }
}
