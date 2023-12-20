import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { HuxiuService } from './huxiu.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { HUXIU_CACHE_KEY } from './huxiu.constant'

//TODO: dynamic redis key
@Controller('sites/huxiu')
@UseInterceptors(RedisCachingInterceptor)
export class HuxiuController {
  constructor(private readonly huxiuService: HuxiuService) {}
  //#region huxiu
  @Get('latest')
  @RedisKey(HUXIU_CACHE_KEY.LATEST)
  public async huxiuLatest() {
    return await this.huxiuService.latest()
  }

  @Get('event')
  @RedisKey(HUXIU_CACHE_KEY.EVENT)
  public async huxiuEvent() {
    return await this.huxiuService.event()
  }
  @Get('timeline')
  @RedisKey(HUXIU_CACHE_KEY.TIMELINE)
  public async huxiuTimeline() {
    return await this.huxiuService.timeline()
  }
  //#endregion
}
