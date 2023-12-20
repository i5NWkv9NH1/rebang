import { Process, Processor } from '@nestjs/bull'
import {
  PEAR_VIDEO_CACHE_KEY,
  PEAR_VIDEO_JOB_DEFINE,
  PEAR_VIDEO_QUEUE_NAME
} from './pearvideo.constant'
import { RedisService } from 'src/shared/redis.service'
import { PearVideoService } from './pearvideo.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(PEAR_VIDEO_QUEUE_NAME)
export class PearVideoProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly pearvideoService: PearVideoService
  ) {}
}
