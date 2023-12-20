import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { XUEQIU_JOB_DEFINE, XUEQIU_QUEUE_NAME } from './xueqiu.constant'
import { Queue } from 'bull'

//TODO: add jobs
@Injectable()
export class XueqiuJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = []

  constructor(@InjectQueue(XUEQIU_QUEUE_NAME) queue: Queue) {
    super({ name: XueqiuJob.name, queue })
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
