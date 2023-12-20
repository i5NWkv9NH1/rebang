import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { _36KService } from './_36k.service'
import { Cron, CronExpression } from '@nestjs/schedule'
import { _36K_JOB_DEFINE, _36K_QUEUE_NAME } from './_36k.constant'
import { TasksService } from 'src/modules/tasks/tasks.service'
import { InjectQueue } from '@nestjs/bull'
import { Job, Queue } from 'bull'
import { BaseSiteJob } from 'src/shared/base-site.job'

@Injectable()
export class _36KJob
  extends BaseSiteJob
  implements OnModuleInit, OnModuleDestroy
{
  private readonly defineJobs = [
    {
      key: _36K_JOB_DEFINE.LATEST.KEY,
      name: _36K_JOB_DEFINE.LATEST.NAME,
      scope: _36K_JOB_DEFINE.LATEST.SCOPE,
      cron: _36K_JOB_DEFINE.LATEST.CRON
    },
    {
      key: _36K_JOB_DEFINE.RANK.HOT.KEY,
      name: _36K_JOB_DEFINE.RANK.HOT.NAME,
      scope: _36K_JOB_DEFINE.RANK.HOT.SCOPE,
      cron: _36K_JOB_DEFINE.RANK.HOT.CRON
    },
    {
      key: _36K_JOB_DEFINE.RANK.VIDEO.KEY,
      name: _36K_JOB_DEFINE.RANK.VIDEO.NAME,
      scope: _36K_JOB_DEFINE.RANK.VIDEO.SCOPE,
      cron: _36K_JOB_DEFINE.RANK.VIDEO.CRON
    },
    {
      key: _36K_JOB_DEFINE.RANK.COMMENT.KEY,
      name: _36K_JOB_DEFINE.RANK.COMMENT.NAME,
      scope: _36K_JOB_DEFINE.RANK.COMMENT.SCOPE,
      cron: _36K_JOB_DEFINE.RANK.COMMENT.CRON
    },
    {
      key: _36K_JOB_DEFINE.RANK.COLLECT.KEY,
      name: _36K_JOB_DEFINE.RANK.COLLECT.NAME,
      scope: _36K_JOB_DEFINE.RANK.COLLECT.SCOPE,
      cron: _36K_JOB_DEFINE.RANK.COLLECT.CRON
    }
  ]

  constructor(@InjectQueue(_36K_QUEUE_NAME) queue: Queue) {
    super({ name: _36KJob.name, queue })
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
