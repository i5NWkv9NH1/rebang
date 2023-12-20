import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { AcFunService } from './acfun.service'
import { RedisService } from 'src/shared/redis.service'
import { ACFUN_CACHE_KEY } from './acfun.constant'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'

@Controller('sites/acfun')
@UseInterceptors(RedisCachingInterceptor)
export class AcfunController {
  constructor(
    private readonly acFunService: AcFunService,
    private readonly redisService: RedisService
  ) {}

  @Get('day')
  @RedisKey(ACFUN_CACHE_KEY.RANK.DAY)
  public async day() {
    return this.acFunService.day()
  }
  @Get('threedays')
  @RedisKey(ACFUN_CACHE_KEY.RANK.THREE_DAYS)
  public async threeDays() {
    return this.acFunService.threedays()
  }
  @Get('week')
  @RedisKey(ACFUN_CACHE_KEY.RANK.WEEK)
  public async week() {
    return this.acFunService.week()
  }
}
