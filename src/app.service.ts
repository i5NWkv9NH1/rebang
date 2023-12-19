import { InjectRedis, RedisService } from '@liaoliaots/nestjs-redis'
import { HttpService } from '@nestjs/axios'
import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { Redis } from 'ioredis'

@Injectable()
export class AppService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectQueue('_36k')
    private readonly _36kQueue: Queue
  ) {}

  async get(key: string) {
    return await this.redis.get(key)
  }

  async set() {
    return await this.redis.set('key', 'value', 'EX', 3600)
  }

  async del(key: string) {
    return await this.redis.del(key)
  }

  getHello(): string {
    return 'Hello World!'
  }

  public async findAllTask() {
    return await this._36kQueue.getJobs([
      'active',
      'completed',
      'delayed',
      'failed',
      'paused',
      'waiting'
    ])
  }

  public async findTaskByName(id: string) {
    // return await this._36kQueue.getJobs(['active', 'completed', 'delayed', 'failed', 'paused', 'waiting'])
    return await this._36kQueue.getJob(id)
    // return this.schedulerRegistry.getCronJob(name)
  }
}
