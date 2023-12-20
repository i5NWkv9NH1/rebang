import { Process, Processor } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import {
  _360_CACHE_KEY,
  _360_JOB_DEFINE,
  _360_QUEUE_NAME
} from './_360.constant'
import { RedisService } from 'src/shared/redis.service'
import { _360Service } from './_360.service'
import { Job } from 'bull'
import { GetReturnDataType, JobData } from 'src/shared/type'

@Processor(_360_QUEUE_NAME)
export class _360Processor {
  constructor(
    private readonly redisService: RedisService,
    private readonly _360Service: _360Service
  ) {}

  @Process(_360_JOB_DEFINE.RANK.KEY)
  async rank(job: Job) {
    await job.progress(0)
    type Items = GetReturnDataType<typeof this._360Service.rank>
    const items = await this._360Service.rank()
    await job.progress(50)
    const data: JobData<Items, any> = {
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(_360_CACHE_KEY.RANK, data)
    await job.progress(100)
    return await job.data
  }
}
