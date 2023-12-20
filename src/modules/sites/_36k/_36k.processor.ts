import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { CronExpression } from '@nestjs/schedule'
import { Job, Queue } from 'bull'
import { RedisService } from 'src/shared/redis.service'
import { _36KService } from './_36k.service'
import { _36K_CACHE_KEY } from './_36k.constant'
import { JobData, GetReturnDataType } from 'src/shared/type'

@Processor('_36k')
export class _36kProcessor implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(_36kProcessor.name)

  constructor(
    @InjectQueue('_36k')
    private readonly queue: Queue,
    private readonly redisService: RedisService,
    private readonly _36kService: _36KService
  ) {}

  @OnQueueActive()
  onActive(job: Job) {}

  async onModuleInit() {
    this.queue.add(
      'rank-hot',
      { name: '36氪-热榜' },
      { repeat: { cron: CronExpression.EVERY_5_MINUTES } }
    )
  }

  async onModuleDestroy() {
    const jobs = await this.queue.getJobs([
      'active',
      'completed',
      'delayed',
      'failed',
      'paused',
      'waiting'
    ])
    jobs.forEach((job: Job) => {
      job.remove()
    })
  }

  @Process('rank-hot')
  async rankHot(job: Job) {
    const items = await this._36kService.rankHot()
    type Items = GetReturnDataType<typeof this._36kService.rankHot>

    const data: JobData<Items> = {
      name: '36k-热榜',
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      items
    }

    await job.update(data)
    await this.redisService.set(_36K_CACHE_KEY.RANK.HOT, data, 300)
    return await job.data
  }
}
