import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { PENGPAI_JOB_DEFINE, PENGPAI_QUEUE_NAME } from './pengpai.constant'
import { Queue } from 'bull'

//TODO: add jobs
@Injectable()
export class PengpaiJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: PENGPAI_JOB_DEFINE.HOT.KEY,
      name: PENGPAI_JOB_DEFINE.HOT.NAME,
      scope: PENGPAI_JOB_DEFINE.HOT.SCOPE,
      cron: PENGPAI_JOB_DEFINE.HOT.CRON
    }
  ]

  constructor(@InjectQueue(PENGPAI_QUEUE_NAME) queue: Queue) {
    super({ name: PengpaiJob.name, queue })
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
