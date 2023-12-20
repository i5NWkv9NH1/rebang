import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import {
  SHADIAONEWS_JOB_DEFINE,
  SHADIAONEWS_QUEUE_NAME
} from './shadiaonews.constant'
import { Queue } from 'bull'

@Injectable()
export class ShadiaonewsJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: SHADIAONEWS_JOB_DEFINE.MAIN.KEY,
      name: SHADIAONEWS_JOB_DEFINE.MAIN.NAME,
      scope: SHADIAONEWS_JOB_DEFINE.MAIN.SCOPE,
      cron: SHADIAONEWS_JOB_DEFINE.MAIN.CRON
    }
  ]

  constructor(@InjectQueue(SHADIAONEWS_QUEUE_NAME) queue: Queue) {
    super({ name: ShadiaonewsJob.name, queue })
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
