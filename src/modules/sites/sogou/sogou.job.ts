import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { SOGOU_JOB_DEFINE, SOGOU_QUEUE_NAME } from './sogou.constant'
import { Queue } from 'bull'

@Injectable()
export class SogouJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: SOGOU_JOB_DEFINE.HOT.KEY,
      name: SOGOU_JOB_DEFINE.HOT.NAME,
      scope: SOGOU_JOB_DEFINE.HOT.SCOPE,
      cron: SOGOU_JOB_DEFINE.HOT.CRON
    }
  ]

  constructor(@InjectQueue(SOGOU_QUEUE_NAME) queue: Queue) {
    super({ name: SogouJob.name, queue })
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
