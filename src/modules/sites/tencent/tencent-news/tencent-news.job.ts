import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import {
  TENCENT_NEWS_JOB_DEFINE,
  TENCENT_NEWS_QUEUE_NAME
} from './tencent-news.constant'
import { Queue } from 'bull'

@Injectable()
export class TencentNewsJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: TENCENT_NEWS_JOB_DEFINE.HOT_RANK_LIST.KEY,
      name: TENCENT_NEWS_JOB_DEFINE.HOT_RANK_LIST.NAME,
      scope: TENCENT_NEWS_JOB_DEFINE.HOT_RANK_LIST.SCOPE,
      cron: TENCENT_NEWS_JOB_DEFINE.HOT_RANK_LIST.CRON
    },
    {
      key: TENCENT_NEWS_JOB_DEFINE.HOT_QUESTION_LIST.KEY,
      name: TENCENT_NEWS_JOB_DEFINE.HOT_QUESTION_LIST.NAME,
      scope: TENCENT_NEWS_JOB_DEFINE.HOT_QUESTION_LIST.SCOPE,
      cron: TENCENT_NEWS_JOB_DEFINE.HOT_QUESTION_LIST.CRON
    }
  ]

  constructor(@InjectQueue(TENCENT_NEWS_QUEUE_NAME) queue: Queue) {
    super({ name: TencentNewsJob.name, queue })
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
