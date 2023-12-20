import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { HUXIU_JOB_DEFINE, HUXIU_QUEUE_NAME } from './huxiu.constant'
import { Queue } from 'bull'

//TODO: dynamic job
@Injectable()
export class HuxiuJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: HUXIU_JOB_DEFINE.LATEST.KEY,
      name: HUXIU_JOB_DEFINE.LATEST.NAME,
      scope: HUXIU_JOB_DEFINE.LATEST.SCOPE,
      cron: HUXIU_JOB_DEFINE.LATEST.CRON
    },
    {
      key: HUXIU_JOB_DEFINE.TIMELINE.KEY,
      name: HUXIU_JOB_DEFINE.TIMELINE.NAME,
      scope: HUXIU_JOB_DEFINE.TIMELINE.SCOPE,
      cron: HUXIU_JOB_DEFINE.TIMELINE.CRON
    },
    {
      key: HUXIU_JOB_DEFINE.EVENT.KEY,
      name: HUXIU_JOB_DEFINE.EVENT.NAME,
      scope: HUXIU_JOB_DEFINE.EVENT.SCOPE,
      cron: HUXIU_JOB_DEFINE.EVENT.CRON
    }
  ]

  constructor(@InjectQueue(HUXIU_QUEUE_NAME) queue: Queue) {
    super({ name: HuxiuJob.name, queue })
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
