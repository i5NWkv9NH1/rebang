import { Process, Processor } from '@nestjs/bull'
import {
  XUEQIU_CACHE_KEY,
  XUEQIU_JOB_DEFINE,
  XUEQIU_QUEUE_NAME
} from './xueqiu.constant'
import { RedisService } from 'src/shared/redis.service'
import { XueqiuService } from './xueqiu.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(XUEQIU_QUEUE_NAME)
export class XueqiuProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly xueqiuService: XueqiuService
  ) {}
}
