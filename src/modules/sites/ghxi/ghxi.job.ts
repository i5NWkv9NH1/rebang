import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { GHXI_JOB_DEFINE, GHXI_QUEUE_NAME } from './ghxi.constant'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Injectable()
export class GhxiJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: GHXI_JOB_DEFINE.LATEST.KEY,
      name: GHXI_JOB_DEFINE.LATEST.NAME,
      scope: GHXI_JOB_DEFINE.LATEST.SCOPE,
      cron: GHXI_JOB_DEFINE.LATEST.CRON
    },
    {
      key: GHXI_JOB_DEFINE.PC.KEY,
      name: GHXI_JOB_DEFINE.PC.NAME,
      scope: GHXI_JOB_DEFINE.PC.SCOPE,
      cron: GHXI_JOB_DEFINE.PC.CRON
    },
    {
      key: GHXI_JOB_DEFINE.ANDROID.KEY,
      name: GHXI_JOB_DEFINE.ANDROID.NAME,
      scope: GHXI_JOB_DEFINE.ANDROID.SCOPE,
      cron: GHXI_JOB_DEFINE.ANDROID.CRON
    }
  ]

  constructor(@InjectQueue(GHXI_QUEUE_NAME) queue: Queue) {
    super({ name: GhxiJob.name, queue })
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
