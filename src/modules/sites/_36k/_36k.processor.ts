import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { CronExpression } from '@nestjs/schedule'
import { Job, JobStatus, Queue } from 'bull'
import { RedisService } from 'src/shared/redis.service'
import { _36KService } from './_36k.service'
import {
  _36K_CACHE_KEY,
  _36K_JOB_DEFINE,
  _36K_QUEUE_NAME
} from './_36k.constant'
import { JobData, GetReturnDataType } from 'src/shared/type'

@Processor(_36K_QUEUE_NAME)
export class _36kProcessor {
  constructor(
    private readonly redisService: RedisService,
    private readonly _36kService: _36KService
  ) {}

  @Process(_36K_JOB_DEFINE.LATEST.KEY)
  async latest(job: Job) {
    await job.progress(0)
    const { items, meta } = await this._36kService.latest()
    await job.progress(50)
    const data: JobData<any, any> = {
      // name: _36K_JOB_DEFINE.LATEST.NAME,
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items,
      meta
    }
    await job.update(data)
    await this.redisService.set(_36K_CACHE_KEY.LATEST, data)
    await job.progress(100)
    return await job.data
  }

  @Process(_36K_JOB_DEFINE.RANK.HOT.KEY)
  async rankHot(job: Job) {
    await job.progress(0)
    const items = await this._36kService.rankHot()
    type Items = GetReturnDataType<typeof this._36kService.rankHot>
    await job.progress(50)
    const data: JobData<Items> = {
      // name: _36K_JOB_DEFINE.RANK.HOT.NAME,
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(_36K_CACHE_KEY.RANK.HOT, data)
    await job.progress(100)
    return await job.data
  }

  @Process(_36K_JOB_DEFINE.RANK.VIDEO.KEY)
  async rankVideo(job: Job) {
    await job.progress(0)
    const items = await this._36kService.rankVideo()
    type Items = GetReturnDataType<typeof this._36kService.rankVideo>
    await job.progress(50)
    const data: JobData<Items> = {
      // name: _36K_JOB_DEFINE.RANK.VIDEO.NAME,
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(_36K_CACHE_KEY.RANK.VIDEO, data)
    await job.progress(100)
    return await job.data
  }

  @Process(_36K_JOB_DEFINE.RANK.COMMENT.KEY)
  async rankComment(job: Job) {
    await job.progress(0)
    const items = await this._36kService.rankComment()
    type Items = GetReturnDataType<typeof this._36kService.rankComment>
    await job.progress(50)
    const data: JobData<Items> = {
      // name: _36K_JOB_DEFINE.RANK.COMMENT.NAME,
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(_36K_CACHE_KEY.RANK.COMMENT, data)
    await job.progress(100)
    return await job.data
  }

  @Process(_36K_JOB_DEFINE.RANK.COLLECT.KEY)
  async rankCollect(job: Job) {
    await job.progress(0)
    const items = await this._36kService.rankCollect()
    type Items = GetReturnDataType<typeof this._36kService.rankCollect>
    await job.progress(50)
    const data: JobData<Items> = {
      // name: _36K_JOB_DEFINE.RANK.COLLECT.NAME,
      ...job.data,
      createdAt: job.timestamp,
      updatedAt: job.finishedOn,
      processedAt: job.processedOn,
      items
    }
    await job.update(data)
    await this.redisService.set(_36K_CACHE_KEY.RANK.COLLECT, data)
    await job.progress(100)
    return await job.data
  }
}
