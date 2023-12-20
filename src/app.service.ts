import { InjectRedis, RedisService } from '@liaoliaots/nestjs-redis'
import { HttpService } from '@nestjs/axios'
import { InjectQueue } from '@nestjs/bull'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Queue } from 'bull'
import { Redis } from 'ioredis'

@Injectable()
export class AppService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis
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
}
