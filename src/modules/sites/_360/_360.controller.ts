import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { _360Service } from './_360.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { _360_CACHE_KEY } from './_360.constant'

@Controller('sites/360')
@UseInterceptors(RedisCachingInterceptor)
export class _360Controller {
  constructor(private readonly _360service: _360Service) {}

  @Get('rank')
  @RedisKey(_360_CACHE_KEY.RANK)
  public async rank() {
    return await this._360service.rank()
  }
}
