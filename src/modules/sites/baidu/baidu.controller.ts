import { Controller, Get, Query, UseInterceptors } from '@nestjs/common'
import { BaiduService } from './baidu.service'
import { BAIDU_CACHE_KEY, BaiduRankTab } from './baidu.constant'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'

//TODO: dynamic redis key
@Controller('sites/baidu')
@UseInterceptors(RedisCachingInterceptor)
export class BaiduController {
  constructor(private readonly baiduService: BaiduService) {}

  @Get('rank')
  @RedisKey(BAIDU_CACHE_KEY.REALTIME)
  public async rank(@Query('tab') tab: BaiduRankTab) {
    return await this.baiduService.rank(tab)
  }
}
