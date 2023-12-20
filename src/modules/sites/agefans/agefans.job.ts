import { InjectQueue } from '@nestjs/bull'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { AGEFANS_JOB_DEFINE, AGEFANS_QUEUE_NAME } from './agefans.constant'
import { Queue } from 'bull'

@Injectable()
export class AgefansJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @InjectQueue(AGEFANS_QUEUE_NAME)
    queue: Queue
  ) {
    super({ name: AgefansJob.name, queue })
  }

  private readonly defineJobs = [
    {
      key: AGEFANS_JOB_DEFINE.LATEST.KEY,
      name: AGEFANS_JOB_DEFINE.LATEST.NAME,
      scope: AGEFANS_JOB_DEFINE.LATEST.SCOPE,
      cron: AGEFANS_JOB_DEFINE.LATEST.CRON
    }
  ]

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
