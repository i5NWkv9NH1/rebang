import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { SSP_JOB_DEFINE, SSP_QUEUE_NAME } from './ssp.constant'
import { Queue } from 'bull'

//TODO: add jobs
@Injectable()
export class SspJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: SSP_JOB_DEFINE.HOT.KEY,
      name: SSP_JOB_DEFINE.HOT.NAME,
      scope: SSP_JOB_DEFINE.HOT.SCOPE,
      cron: SSP_JOB_DEFINE.HOT.CRON
    },
    {
      key: SSP_JOB_DEFINE.RECOMMENT.KEY,
      name: SSP_JOB_DEFINE.RECOMMENT.NAME,
      scope: SSP_JOB_DEFINE.RECOMMENT.SCOPE,
      cron: SSP_JOB_DEFINE.RECOMMENT.CRON
    }
  ]

  constructor(@InjectQueue(SSP_QUEUE_NAME) queue: Queue) {
    super({ name: SspJob.name, queue })
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
