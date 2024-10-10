import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger } from '@nestjs/common'
import { ZHIHU_QUEUE, ZhihuJobCron, ZhihuJobName } from './zhihu.constant'
import { Queue } from 'bullmq'
import { PartConfigService } from '../services/part-config.service'
import { JobDefinitData } from 'src/@types'

@Injectable()
export class ZhihuService {
  protected readonly logger = new Logger(ZhihuService.name)

  constructor(
    @InjectQueue(ZHIHU_QUEUE)
    private readonly zhihuQueue: Queue<JobDefinitData>,
    private readonly partConfigService: PartConfigService
  ) {}

  async onModuleInit() {
    const config = await this.partConfigService.findActivatedConfig(
      'zhihu',
      'trend'
    )
    this.logger.debug('Load database config', JSON.stringify(config))
    // await this.zhihuQueue.add(ZhihuJob.Trend, { config })
    const job = await this.zhihuQueue.upsertJobScheduler(
      config.jobName || ZhihuJobName.Trend,
      {
        pattern: config.pattern || ZhihuJobCron.Trend,
        immediately: config.immediately || true
      },
      {
        data: {
          config
        }
      }
    )
    this.logger.debug('Job define', JSON.stringify(job))
  }

  async onModuleDestroy() {}
}
