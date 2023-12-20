import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { BaseSiteJob } from 'src/shared/base-site.job'
import { _360_JOB_DEFINE, _360_QUEUE_NAME } from './_360.constant'

@Injectable()
export class _360Job
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: _360_JOB_DEFINE.RANK.KEY,
      name: _360_JOB_DEFINE.RANK.NAME,
      scope: _360_JOB_DEFINE.RANK.SCOPE,
      cron: _360_JOB_DEFINE.RANK.CRON
    }
  ]

  constructor(@InjectQueue(_360_QUEUE_NAME) queue: Queue) {
    super({ name: _360Job.name, queue })
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
