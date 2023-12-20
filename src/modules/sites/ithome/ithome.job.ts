import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { ITHOME_JOB_DEFINE, ITHOME_QUEUE_NAME } from './ithome.constant'
import { Queue } from 'bull'

//TODO: dynamic jobs
@Injectable()
export class ITHomeJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = []

  constructor(@InjectQueue(ITHOME_QUEUE_NAME) queue: Queue) {
    super({ name: ITHomeJob.name, queue })
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
