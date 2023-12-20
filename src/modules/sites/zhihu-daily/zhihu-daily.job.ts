import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import {
  ZHIHU_DAILY_JOB_DEFINE,
  ZHIHU_DAILY_QUEUE_NAME
} from './zhihu-daily.constant'
import { Queue } from 'bull'

@Injectable()
export class ZhihuDailyJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: ZHIHU_DAILY_JOB_DEFINE.LATEST.KEY,
      name: ZHIHU_DAILY_JOB_DEFINE.LATEST.NAME,
      scope: ZHIHU_DAILY_JOB_DEFINE.LATEST.SCOPE,
      cron: ZHIHU_DAILY_JOB_DEFINE.LATEST.CRON
    }
  ]

  constructor(@InjectQueue(ZHIHU_DAILY_QUEUE_NAME) queue: Queue) {
    super({ name: ZhihuDailyJob.name, queue })
  }

  async onModuleInit() {
    await this.removeAll()
    for await (const job of this.defineJobs) {
      await this.queue.add(job.key, job, {
        repeat: { cron: job.cron }
      })
    }
  }
  async onModuleDestroy() {
    await this.removeAll()
  }
}
