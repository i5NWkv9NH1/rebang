import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { ToutiaoService } from './toutiao.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { TOUTIAO_CACHE_KEY } from './toutiao.constant'

@Controller('sites/toutiao')
@UseInterceptors(RedisCachingInterceptor)
export class ToutiaoController {
  constructor(private readonly toutiaoService: ToutiaoService) {}

  @Get('hot')
  @RedisKey(TOUTIAO_CACHE_KEY.HOT)
  public async hot() {
    return await this.toutiaoService.hot()
  }
}
