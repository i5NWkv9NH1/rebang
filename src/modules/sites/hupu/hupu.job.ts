import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { HUPU_JOB_DEFINE, HUPU_QUEUE_NAME } from './hupu.constant'
import { Queue } from 'bull'

//TODO: dynamic jobs
@Injectable()
export class HupuJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = []

  constructor(@InjectQueue(HUPU_QUEUE_NAME) queue: Queue) {
    super({ name: HupuJob.name, queue })
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
