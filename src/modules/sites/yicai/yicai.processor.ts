import { Process, Processor } from '@nestjs/bull'
import {
  YICAI_CACHE_KEY,
  YICAI_JOB_DEFINE,
  YICAI_QUEUE_NAME
} from './yicai.constant'
import { RedisService } from 'src/shared/redis.service'
import { YicaiService } from './yicai.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(YICAI_QUEUE_NAME)
export class YicaiProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly yicaiService: YicaiService
  ) {}
}
