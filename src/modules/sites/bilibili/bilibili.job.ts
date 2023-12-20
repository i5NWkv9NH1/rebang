import { InjectQueue } from '@nestjs/bull'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { BILIBILI_JOB_DEFINE, BILIBILI_QUEUE_NAME } from './bilibili.constant'
import { Queue } from 'bull'

@Injectable()
export class BilibiliJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: BILIBILI_JOB_DEFINE.HOT.KEY,
      name: BILIBILI_JOB_DEFINE.HOT.NAME,
      scope: BILIBILI_JOB_DEFINE.HOT.SCOPE,
      cron: BILIBILI_JOB_DEFINE.HOT.CRON
    },
    {
      key: BILIBILI_JOB_DEFINE.WEEK.KEY,
      name: BILIBILI_JOB_DEFINE.WEEK.NAME,
      scope: BILIBILI_JOB_DEFINE.WEEK.SCOPE,
      cron: BILIBILI_JOB_DEFINE.WEEK.CRON
    },
    {
      key: BILIBILI_JOB_DEFINE.RANK.KEY,
      name: BILIBILI_JOB_DEFINE.RANK.NAME,
      scope: BILIBILI_JOB_DEFINE.RANK.SCOPE,
      cron: BILIBILI_JOB_DEFINE.RANK.CRON
    }
  ]

  constructor(@InjectQueue(BILIBILI_QUEUE_NAME) queue: Queue) {
    super({ name: BilibiliJob.name, queue })
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
