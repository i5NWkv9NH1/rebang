import { Injectable, Logger } from '@nestjs/common'
import { RedisService as LiaoliaoRedis } from '@liaoliaots/nestjs-redis'
import type { Redis } from 'ioredis'
import { stringify, parse } from 'flatted' // 引入 flatted 处理循环引用
import { RedisData } from 'src/@types'

@Injectable()
export class RedisService {
  protected readonly logger = new Logger(RedisService.name)
  private readonly redis: Redis
  private readonly defaultExpiry: number = 300 // 默认过期时间为 5 分钟（300秒）

  constructor(private readonly liaoliaoRedis: LiaoliaoRedis) {
    this.redis = this.liaoliaoRedis.getOrThrow()
  }

  // 存储任意类型的数据，过期时间默认为 5 分钟
  async set(
    key: string,
    value: any,
    expiry: number = this.defaultExpiry
  ): Promise<string> {
    const serializedValue = stringify(value) // 使用 flatted 库序列化
    return await this.redis.set(key, serializedValue, 'EX', expiry)
  }

  // 获取任意类型的数据
  async get<T = RedisData>(key: string): Promise<T | null> {
    const value = await this.redis.get(key)
    if (value) {
      return parse(value) as T // 使用 flatted 库反序列化
    }
    return null // 如果不存在，则返回 null
  }

  // 删除指定键
  async del(key: string): Promise<number> {
    return await this.redis.del(key)
  }

  // 检查某个键是否存在
  async exists(key: string): Promise<number> {
    return await this.redis.exists(key)
  }

  // 设置哈希表中的键值对
  async hSet(key: string, field: string, value: any): Promise<number> {
    const serializedValue = stringify(value)
    return await this.redis.hset(key, field, serializedValue)
  }

  // 获取哈希表中某个字段的值
  async hGet<T>(key: string, field: string): Promise<T | null> {
    const value = await this.redis.hget(key, field)
    if (value) {
      return parse(value) as T // 使用 flatted 库反序列化
    }
    return null // 如果不存在，则返回 null
  }

  // 获取哈希表中的所有字段和值
  async hGetAll(key: string): Promise<Record<string, any>> {
    const entries = await this.redis.hgetall(key)
    const result: Record<string, any> = {}
    for (const field in entries) {
      result[field] = parse(entries[field]) // 使用 flatted 库反序列化每个字段的值
    }
    return result
  }

  // 列出所有键
  async keys(pattern: string): Promise<string[]> {
    return await this.redis.keys(pattern)
  }

  // 清空 Redis 数据库
  async flushAll(): Promise<string> {
    return await this.redis.flushall()
  }
}
