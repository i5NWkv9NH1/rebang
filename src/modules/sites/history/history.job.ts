import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { HISTORY_JOB_DEFINE, HISTORY_QUEUE_NAME } from './history.constant'
import { Queue } from 'bull'

@Injectable()
export class HistoryJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: HISTORY_JOB_DEFINE._360.KEY,
      name: HISTORY_JOB_DEFINE._360.NAME,
      scope: HISTORY_JOB_DEFINE._360.SCOPE,
      cron: HISTORY_JOB_DEFINE._360.CRON
    }
  ]

  constructor(@InjectQueue(HISTORY_QUEUE_NAME) queue: Queue) {
    super({ name: HistoryJob.name, queue })
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
