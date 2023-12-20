import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import {
  PEAR_VIDEO_JOB_DEFINE,
  PEAR_VIDEO_QUEUE_NAME
} from './pearvideo.constant'
import { Queue } from 'bull'

//TODO: add jobs
@Injectable()
export class PearVideoJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = []

  constructor(@InjectQueue(PEAR_VIDEO_QUEUE_NAME) queue: Queue) {
    super({ name: PearVideoJob.name, queue })
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
