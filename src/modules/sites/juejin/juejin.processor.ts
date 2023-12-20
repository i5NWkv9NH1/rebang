import { Process, Processor } from '@nestjs/bull'
import {
  JUEJIN_CACHE_KEY,
  JUEJIN_JOB_DEFINE,
  JUEJIN_QUEUE_NAME
} from './juejin.constant'
import { RedisService } from 'src/shared/redis.service'
import { JuejinService } from './juejin.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(JUEJIN_QUEUE_NAME)
export class JuejinProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly juejinService: JuejinService
  ) {}

  // @Process(JUEJIN_JOB_DEFINE.HOT.KEY)
  // async hot(job: Job) {
  //   await job.progress(0)
  //   type Items = GetReturnDataType<typeof this.juejinService.hot>
  //   const items = await this.juejinService.hot()
  //   await job.progress(50)
  //   const data: JobData<Items, any> = {
  //     ...job.data,
  //     createdAt: job.timestamp,
  //     updatedAt: job.finishedOn,
  //     processedAt: job.processedOn,
  //     items
  //   }
  //   await job.update(data)
  //   await this.redisService.set(JUEJIN_CACHE_KEY.HOT, data, )
  //   await job.progress(100)
  //   return await job.data
  // }
}
