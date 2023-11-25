import { InjectRedis, RedisService } from '@liaoliaots/nestjs-redis'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
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

  getHello(): string {
    return 'Hello World!'
  }
}
