import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import {
  NETEASE_NEWS_JOB_DEFINE,
  NETEASE_NEWS_QUEUE_NAME
} from './netease-news.constant'
import { Queue } from 'bull'

//TODO: add jobs
@Injectable()
export class NeteaseNewsJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: NETEASE_NEWS_JOB_DEFINE.HOT.KEY,
      name: NETEASE_NEWS_JOB_DEFINE.HOT.NAME,
      scope: NETEASE_NEWS_JOB_DEFINE.HOT.SCOPE,
      cron: NETEASE_NEWS_JOB_DEFINE.HOT.CRON
    },
    {
      key: NETEASE_NEWS_JOB_DEFINE.COMMENT.KEY,
      name: NETEASE_NEWS_JOB_DEFINE.COMMENT.NAME,
      scope: NETEASE_NEWS_JOB_DEFINE.COMMENT.SCOPE,
      cron: NETEASE_NEWS_JOB_DEFINE.COMMENT.CRON
    },
    {
      key: NETEASE_NEWS_JOB_DEFINE.VIDEO.KEY,
      name: NETEASE_NEWS_JOB_DEFINE.VIDEO.NAME,
      scope: NETEASE_NEWS_JOB_DEFINE.VIDEO.SCOPE,
      cron: NETEASE_NEWS_JOB_DEFINE.VIDEO.CRON
    },
    {
      key: NETEASE_NEWS_JOB_DEFINE.SEARCH.KEY,
      name: NETEASE_NEWS_JOB_DEFINE.SEARCH.NAME,
      scope: NETEASE_NEWS_JOB_DEFINE.SEARCH.SCOPE,
      cron: NETEASE_NEWS_JOB_DEFINE.SEARCH.CRON
    },
    {
      key: NETEASE_NEWS_JOB_DEFINE.TOPIC.KEY,
      name: NETEASE_NEWS_JOB_DEFINE.TOPIC.NAME,
      scope: NETEASE_NEWS_JOB_DEFINE.TOPIC.SCOPE,
      cron: NETEASE_NEWS_JOB_DEFINE.TOPIC.CRON
    }
  ]

  constructor(@InjectQueue(NETEASE_NEWS_QUEUE_NAME) queue: Queue) {
    super({ name: NeteaseNewsJob.name, queue })
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
