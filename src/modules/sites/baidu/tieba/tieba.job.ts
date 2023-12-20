import { InjectQueue } from '@nestjs/bull'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { TIEBA_JOB_DEFINE, TIEBA_QUEUE_NAME } from './tieba.constant'
import { Queue } from 'bull'

@Injectable()
export class TiebaJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: TIEBA_JOB_DEFINE.TOPIC_LIST.KEY,
      name: TIEBA_JOB_DEFINE.TOPIC_LIST.NAME,
      scope: TIEBA_JOB_DEFINE.TOPIC_LIST.SCOPE,
      cron: TIEBA_JOB_DEFINE.TOPIC_LIST.CRON
    }
  ]

  constructor(@InjectQueue(TIEBA_QUEUE_NAME) queue: Queue) {
    super({ name: TiebaJob.name, queue })
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
