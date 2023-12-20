import { InjectQueue } from '@nestjs/bull'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { ACFUN_JOB_DEFINE, ACFUN_QUEUE_NAME } from './acfun.constant'
import { Queue } from 'bull'

@Injectable()
export class AcFunJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  constructor(@InjectQueue(ACFUN_QUEUE_NAME) queue: Queue) {
    super({ name: AcFunJob.name, queue })
  }

  private readonly defineJobs = [
    {
      key: ACFUN_JOB_DEFINE.RANK.DAY.KEY,
      name: ACFUN_JOB_DEFINE.RANK.DAY.NAME,
      scope: ACFUN_JOB_DEFINE.RANK.DAY.SCOPE,
      cron: ACFUN_JOB_DEFINE.RANK.DAY.CRON
    },
    {
      key: ACFUN_JOB_DEFINE.RANK.THREE_DAYS.KEY,
      name: ACFUN_JOB_DEFINE.RANK.THREE_DAYS.NAME,
      scope: ACFUN_JOB_DEFINE.RANK.THREE_DAYS.SCOPE,
      cron: ACFUN_JOB_DEFINE.RANK.THREE_DAYS.CRON
    },
    {
      key: ACFUN_JOB_DEFINE.RANK.WEEK.KEY,
      name: ACFUN_JOB_DEFINE.RANK.WEEK.NAME,
      scope: ACFUN_JOB_DEFINE.RANK.WEEK.SCOPE,
      cron: ACFUN_JOB_DEFINE.RANK.WEEK.CRON
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
