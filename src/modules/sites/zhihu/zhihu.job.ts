import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { ZHIHU_JOB_DEFINE, ZHIHU_QUEUE_NAME } from './zhihu.constant'
import { Queue } from 'bull'

@Injectable()
export class ZhihuJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: ZHIHU_JOB_DEFINE.BILLBOARD.KEY,
      name: ZHIHU_JOB_DEFINE.BILLBOARD.NAME,
      scope: ZHIHU_JOB_DEFINE.BILLBOARD.SCOPE,
      cron: ZHIHU_JOB_DEFINE.BILLBOARD.CRON
    }
  ]

  constructor(@InjectQueue(ZHIHU_QUEUE_NAME) queue: Queue) {
    super({ name: ZhihuJob.name, queue })
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
