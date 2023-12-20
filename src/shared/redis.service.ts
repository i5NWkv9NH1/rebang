import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable, Logger } from '@nestjs/common'
import { Redis } from 'ioredis'
import { throwError } from 'rxjs'

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name)

  constructor(@InjectRedis() private readonly redis: Redis) {}

  public async get(key: string) {
    this.logger.debug(`Key: ${key}`)

    const cache = await this.redis.get(key)
    if (typeof cache === 'object') {
      return JSON.parse(cache)
    } else {
      return cache
    }
  }

  public async set(key: string, data: any, ttl: number = 3600) {
    this.logger.debug(`Key: ${key}`)
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
