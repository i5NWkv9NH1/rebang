import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { BILIBILI_QUEUE_NAME, BilibiliJobName } from './bilibili.constant'
import { Queue } from 'bullmq'
import { WebsiteService } from '../../bussiness/website/services/website.service'
import { JobDefinitData } from 'src/@types'
import { JobDefineService } from 'src/common/abstracts/job-define.service'

@Injectable()
export class BilibiliService extends JobDefineService {
  constructor(
    @InjectQueue(BILIBILI_QUEUE_NAME)
    queue: Queue<JobDefinitData>,
    websiteService: WebsiteService
  ) {
    super(queue, websiteService, 'bilibili')
  }
}
