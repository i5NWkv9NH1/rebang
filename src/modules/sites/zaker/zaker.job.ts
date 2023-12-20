import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { ZAKER_JOB_DEFINE, ZAKER_QUEUE_NAME } from './zaker.constant'
import { Queue } from 'bull'

//TODO: add jobs
@Injectable()
export class ZakerJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: ZAKER_JOB_DEFINE.HOT.KEY,
      name: ZAKER_JOB_DEFINE.HOT.NAME,
      scope: ZAKER_JOB_DEFINE.HOT.SCOPE,
      cron: ZAKER_JOB_DEFINE.HOT.CRON
    },
    {
      key: ZAKER_JOB_DEFINE.ONLYONE.KEY,
      name: ZAKER_JOB_DEFINE.ONLYONE.NAME,
      scope: ZAKER_JOB_DEFINE.ONLYONE.SCOPE,
      cron: ZAKER_JOB_DEFINE.ONLYONE.CRON
    }
  ]

  constructor(@InjectQueue(ZAKER_QUEUE_NAME) queue: Queue) {
    super({ name: ZakerJob.name, queue })
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
