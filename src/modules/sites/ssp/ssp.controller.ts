import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { SspService } from './ssp.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { SSP_CACHE_KEY } from './ssp.constant'

@Controller('sites/ssp')
@UseInterceptors(RedisCachingInterceptor)
export class SspController {
  constructor(private readonly sspService: SspService) {}

  @Get('hot')
  @RedisKey(SSP_CACHE_KEY.HOT)
  public async sspHot() {
    return await this.sspService.hot()
  }
  @Get('recomment')
  @RedisKey(SSP_CACHE_KEY.RECOMMENT)
  public async recomment() {
    return await this.sspService.recomment()
  }
}
