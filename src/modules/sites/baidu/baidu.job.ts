import { InjectQueue } from '@nestjs/bull'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { BAIDU_QUEUE_NAME } from './baidu.constant'
import { Queue } from 'bull'

//TODO: dynamic jobs
@Injectable()
export class BaiduJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = []

  constructor(@InjectQueue(BAIDU_QUEUE_NAME) queue: Queue) {
    super({ name: BaiduJob.name, queue })
  }

  async onModuleInit() {
    await this.removeAll()
    // for await (const job of this.defineJobs) {
    //   await this.queue.add(job.key, job, {
    //     repeat: { cron: job.cron }
    //   })
    // }
  }
  async onModuleDestroy() {
    await this.removeAll()
  }
}
