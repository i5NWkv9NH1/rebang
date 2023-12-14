import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { throwError } from 'rxjs'

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  public async get(key: string) {
    const cache = await this.redis.get(key)
    if (typeof cache === 'object') {
      return JSON.parse(cache)
    } else {
      return cache
    }
  }

  public async set(key: string, data: any, ttl: number = 3600) {
    try {
      if (typeof data === 'object') {
        await this.redis.set(key, JSON.stringify(data), 'EX', ttl)
      } else {
        await this.redis.set(key, data, 'EX', ttl)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  public async rm(key: string) {
    return new Boolean(await this.redis.del(key))
  }
}
