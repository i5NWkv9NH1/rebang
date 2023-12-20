import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { TOUTIAO_JOB_DEFINE, TOUTIAO_QUEUE_NAME } from './toutiao.constant'
import { Queue } from 'bull'

@Injectable()
export class ToutiaoJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: TOUTIAO_JOB_DEFINE.HOT.KEY,
      name: TOUTIAO_JOB_DEFINE.HOT.NAME,
      scope: TOUTIAO_JOB_DEFINE.HOT.SCOPE,
      cron: TOUTIAO_JOB_DEFINE.HOT.CRON
    }
  ]

  constructor(@InjectQueue(TOUTIAO_QUEUE_NAME) queue: Queue) {
    super({ name: ToutiaoJob.name, queue })
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
