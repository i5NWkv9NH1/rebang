import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  SetMetadata
} from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { RedisService } from './redis.service'
import { Reflector } from '@nestjs/core'

export const RedisKey = (key: string) => SetMetadata('redis-key', key)

@Injectable()
export class RedisCachingInterceptor implements NestInterceptor {
  logger = new Logger(RedisCachingInterceptor.name)
  //@ts-ignore

  //? should be private
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    // const key = this.reflector.get('redis-key', context.getHandler())
    //? get handler return get method
    //? example async findAll() { }
    const handler = context.getHandler()
    // const handler = context.getClass()
    //? get metedata on some function
    //? @Setmetadata('', '')
    //? async create() {}
    //* return @Setmetadata() value
    const key = this.reflector.get('redis-key', handler)
    this.logger.debug(key)
    if (!key) return next.handle()

    const cache = await this.redisService.get(key)
    this.logger.debug(cache)
    if (cache) return of(cache)

    return next.handle()
  }
}
