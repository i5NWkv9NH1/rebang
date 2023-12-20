import { Controller, Get, Query, UseInterceptors } from '@nestjs/common'
import { HupuService } from './hupu.service'
import { HUPU_CACHE_KEY, HUPU_TABS } from './hupu.constant'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'

@Controller('sites/hupu')
@UseInterceptors(RedisCachingInterceptor)
export class HupuController {
  constructor(private readonly hupuService: HupuService) {}
  @Get('plate')
  @RedisKey(HUPU_CACHE_KEY.PLATE)
  public async plate(@Query('tab') tab: HUPU_TABS) {
    return await this.hupuService.plate(tab.toUpperCase() as HUPU_TABS)
  }
  //#endregion
}
