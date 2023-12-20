import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { CronExpression } from '@nestjs/schedule'
import { Job, JobStatus, Queue } from 'bull'
import { RedisService } from 'src/shared/redis.service'
import { _36KService } from './_36k.service'
import { _36K_CACHE_KEY } from './_36k.constant'
import { JobData, GetReturnDataType } from 'src/shared/type'

@Processor('_36k')
export class _36kProcessor implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(_36kProcessor.name)
  private readonly types = [
    'active',
    'completed',
    'delayed',
    'failed',
    'paused',
    'waiting'
  ] as JobStatus[]

  constructor(
    @InjectQueue('_36k')
    private readonly queue: Queue,
    private readonly redisService: RedisService,
    private readonly _36kService: _36KService
  ) {}

  @OnQueueActive()
  onActive(job: Job) {}

  async onModuleInit() {
    const jobs = await this.queue.getJobs(this.types)
    jobs.forEach((job: Job) => {
      job.remove()
    })

    // await this.queue.add(
    //   'rank-hot',
    //   { name: '36氪-热榜' },
    //   // { repeat: { cron: CronExpression.EVERY_5_MINUTES } }
    //   { delay: 5000 }
    // )
  }

  async onModuleDestroy() {
    const jobs = await this.queue.getJobs(this.types)
    jobs.forEach((job: Job) => {
      job.remove()
    })
  }

  public async removeAll() {
    const jobs = await this.queue.getJobs(this.types)
    for await (const job of jobs) {
      job.remove()
    }

    return jobs
  }

  @Process('rank-hot')
  async rankHot(job: Job) {
    await job.log(`开始获取数据`)
    const items = await this._36kService.rankHot()
    await job.log(`获取数据成功`)
    type Items = GetReturnDataType<typeof this._36kService.rankHot>
    await job.log(`正在更新。。。`)
    await job.progress(50)
    const data: JobData<Items> = {
      name: '36k-热榜',
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(_36K_CACHE_KEY.RANK.HOT, data, 300)
    await job.progress(100)
    await job.log(`更新成功！`)
    return await job.data
  }
}
