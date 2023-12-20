import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { SogouService } from './sogou.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { SOGOU_CACHE_KEY } from './sogou.constant'

@Controller('sites/sogou')
@UseInterceptors(RedisCachingInterceptor)
export class SogouController {
  constructor(private readonly sogouService: SogouService) {}

  @Get('hot')
  @RedisKey(SOGOU_CACHE_KEY.HOT)
  public async hot() {
    return await this.sogouService.hot()
  }
}
