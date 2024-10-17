import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ZHIHU_QUEUE_NAME, ZhihuJobCron, ZhihuJobName } from './zhihu.constant'
import { Queue } from 'bullmq'
import { PartConfigService } from '../../bussiness/website/services/part-config.service'
import { JobDefinitData } from 'src/@types'
import { SearchService } from 'src/shared/search/search.service'
import { CronExpression } from '@nestjs/schedule'
import { WebsiteService } from '../../bussiness/website/services/website.service'
import { PartConfig } from '../../bussiness/website/entities/part-config.entity'
import { JobDefineService } from 'src/common/abstracts/job-define-service.abstract'

/**
 * * 负责初始化认为、创建和配置全文索引
 */

@Injectable()
export class ZhihuService extends JobDefineService {
  protected readonly logger = new Logger(ZhihuService.name)

  constructor(
    @InjectQueue(ZHIHU_QUEUE_NAME)
    queue: Queue<JobDefinitData>,
    websiteService: WebsiteService
  ) {
    super(queue, websiteService, 'zhihu')
  }
}
