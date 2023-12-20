import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { DouyinService } from './douyin.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { DOUYIN_CACHE_KEY } from './douyin.constant'

@Controller('sites/douyin')
@UseInterceptors(RedisCachingInterceptor)
export class DouyinController {
  constructor(private readonly douyinService: DouyinService) {}

  @Get('cookie')
  @RedisKey(DOUYIN_CACHE_KEY.COOKIE)
  public async getCookie() {
    return await this.douyinService.getCookie()
  }

  @Get('hot')
  @RedisKey(DOUYIN_CACHE_KEY.HOT)
  public async hot() {
    return await this.douyinService.hot()
  }
}
