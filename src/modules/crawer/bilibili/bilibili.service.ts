import { InjectQueue } from '@nestjs/bullmq'
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit
} from '@nestjs/common'
import { BILIBILI_QUEUE_NAME, BilibiliJobName } from './bilibili.constant'
import { Queue } from 'bullmq'
import { WebsiteService } from '../../bussiness/website/services/website.service'
import { JobDefinitData } from 'src/@types'
import { JobDefineService } from 'src/common/abstracts/job-define-service.abstract'

@Injectable()
export class BilibiliService extends JobDefineService {
  protected readonly logger = new Logger(BilibiliService.name)

  constructor(
    @InjectQueue(BILIBILI_QUEUE_NAME)
    queue: Queue<JobDefinitData>,
    websiteService: WebsiteService
  ) {
    super(queue, websiteService, 'bilibili')
  }
}
