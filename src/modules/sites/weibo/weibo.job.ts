import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { WEIBO_JOB_DEFINE, WEIBO_QUEUE_NAME } from './weibo.constant'
import { Queue } from 'bull'

//TODO: add jobs
@Injectable()
export class WeiboJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: WEIBO_JOB_DEFINE.HOT_SEARCH.KEY,
      name: WEIBO_JOB_DEFINE.HOT_SEARCH.NAME,
      scope: WEIBO_JOB_DEFINE.HOT_SEARCH.SCOPE,
      cron: WEIBO_JOB_DEFINE.HOT_SEARCH.CRON
    }
    // {
    //   key: WEIBO_JOB_DEFINE.NEWS.KEY,
    //   name: WEIBO_JOB_DEFINE.NEWS.NAME,
    //   scope: WEIBO_JOB_DEFINE.NEWS.SCOPE,
    //   cron: WEIBO_JOB_DEFINE.NEWS.CRON
    // },
    // {
    //   key: WEIBO_JOB_DEFINE.ENTRANK.KEY,
    //   name: WEIBO_JOB_DEFINE.ENTRANK.NAME,
    //   scope: WEIBO_JOB_DEFINE.ENTRANK.SCOPE,
    //   cron: WEIBO_JOB_DEFINE.ENTRANK.CRON
    // },
    // {
    //   key: WEIBO_JOB_DEFINE.TOPIC_BAND.KEY,
    //   name: WEIBO_JOB_DEFINE.TOPIC_BAND.NAME,
    //   scope: WEIBO_JOB_DEFINE.TOPIC_BAND.SCOPE,
    //   cron: WEIBO_JOB_DEFINE.TOPIC_BAND.CRON
    // },
  ]

  constructor(@InjectQueue(WEIBO_QUEUE_NAME) queue: Queue) {
    super({ name: WeiboJob.name, queue })
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
