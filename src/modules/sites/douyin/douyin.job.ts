import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { DOUYIN_JOB_DEFINE, DOUYIN_QUEUE_NAME } from './douyin.constant'
import { Queue } from 'bull'

@Injectable()
export class DouyinJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: DOUYIN_JOB_DEFINE.HOT.KEY,
      name: DOUYIN_JOB_DEFINE.HOT.NAME,
      scope: DOUYIN_JOB_DEFINE.HOT.SCOPE,
      cron: DOUYIN_JOB_DEFINE.HOT.CRON
    }
  ]

  constructor(@InjectQueue(DOUYIN_QUEUE_NAME) queue: Queue) {
    super({ name: DouyinJob.name, queue })
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
