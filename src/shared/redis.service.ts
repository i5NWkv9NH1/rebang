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

  public async set(key: string, data: Object, ttl?: number) {
    await this.redis.set(key, JSON.stringify(data), 'EX', ttl || 3600)
  }

  public async rm(key: string) {
    return new Boolean(await this.redis.del(key))
  }
}
