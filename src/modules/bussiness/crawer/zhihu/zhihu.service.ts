import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ZHIHU_QUEUE_NAME, ZhihuJobCron, ZhihuJobName } from './zhihu.constant'
import { Queue } from 'bullmq'
import { PartConfigService } from '../../website/services/part-config.service'
import { JobDefinitData } from 'src/@types'
import { SearchService } from 'src/shared/services/search.service'
import { CronExpression } from '@nestjs/schedule'
import { WebsiteService } from '../../website/services/website.service'
import { PartConfig } from '../../website/entities/part-config.entity'

/**
 * * 负责初始化认为、创建和配置全文索引
 */

@Injectable()
export class ZhihuService implements OnModuleInit {
  protected readonly logger = new Logger(ZhihuService.name)

  constructor(
    @InjectQueue(ZHIHU_QUEUE_NAME)
    private readonly queue: Queue<JobDefinitData>,
    private readonly searchService: SearchService,
    private readonly partConfigService: PartConfigService,
    private readonly websiteService: WebsiteService
  ) {}

  async onModuleInit() {
    const website = await this.websiteService.findPartsWithConfig('zhihu')
    for await (const part of website.parts) {
      let config: PartConfig
      if (part.activedConfigId) {
        config = part.configs.find((_) => _.id === part.activedConfigId)
      } else {
        config = part.configs.find((_) => !!_.enabled)
      }
      await this.queue.upsertJobScheduler(
        config.jobName,
        { pattern: config.pattern, immediately: config.immediately },
        { data: { part, config } }
      )
    }
  }
}
