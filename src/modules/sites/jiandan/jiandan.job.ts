import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { JIANDAN_JOB_DEFINE, JIANDAN_QUEUE_NAME } from './jiandan.constant'
import { Queue } from 'bull'

//TODO: add jobs
@Injectable()
export class JiandanJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: JIANDAN_JOB_DEFINE._4H.KEY,
      name: JIANDAN_JOB_DEFINE._4H.NAME,
      scope: JIANDAN_JOB_DEFINE._4H.SCOPE,
      cron: JIANDAN_JOB_DEFINE._4H.CRON
    },
    {
      key: JIANDAN_JOB_DEFINE._3D.KEY,
      name: JIANDAN_JOB_DEFINE._3D.NAME,
      scope: JIANDAN_JOB_DEFINE._3D.SCOPE,
      cron: JIANDAN_JOB_DEFINE._3D.CRON
    },
    {
      key: JIANDAN_JOB_DEFINE._7D.KEY,
      name: JIANDAN_JOB_DEFINE._7D.NAME,
      scope: JIANDAN_JOB_DEFINE._7D.SCOPE,
      cron: JIANDAN_JOB_DEFINE._7D.CRON
    },
    {
      key: JIANDAN_JOB_DEFINE.TOP.KEY,
      name: JIANDAN_JOB_DEFINE.TOP.NAME,
      scope: JIANDAN_JOB_DEFINE.TOP.SCOPE,
      cron: JIANDAN_JOB_DEFINE.TOP.CRON
    },
    {
      key: JIANDAN_JOB_DEFINE.TUCAO.KEY,
      name: JIANDAN_JOB_DEFINE.TUCAO.NAME,
      scope: JIANDAN_JOB_DEFINE.TUCAO.SCOPE,
      cron: JIANDAN_JOB_DEFINE.TUCAO.CRON
    },
    {
      key: JIANDAN_JOB_DEFINE.COMMENTS.KEY,
      name: JIANDAN_JOB_DEFINE.COMMENTS.NAME,
      scope: JIANDAN_JOB_DEFINE.COMMENTS.SCOPE,
      cron: JIANDAN_JOB_DEFINE.COMMENTS.CRON
    },
    {
      key: JIANDAN_JOB_DEFINE.OOXX.KEY,
      name: JIANDAN_JOB_DEFINE.OOXX.NAME,
      scope: JIANDAN_JOB_DEFINE.OOXX.SCOPE,
      cron: JIANDAN_JOB_DEFINE.OOXX.CRON
    }
  ]

  constructor(@InjectQueue(JIANDAN_QUEUE_NAME) queue: Queue) {
    super({ name: JiandanJob.name, queue })
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
