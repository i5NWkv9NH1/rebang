import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  public async get(key: string) {
    const cache = await this.redis.get(key)
    return JSON.parse(cache)
  }

  public async set(key: string, data: Object) {
    await this.redis.set(key, JSON.stringify(data), 'EX', 3600)
  }
}
