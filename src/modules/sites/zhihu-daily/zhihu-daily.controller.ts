import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ZhihuDailyService } from './zhihu-daily.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { ZHIHU_DAILY_CACHE_KEY } from './zhihu-daily.constant'

//TODO: dynamic redis key
@Controller('sites/zhihu-daily')
@UseInterceptors(RedisCachingInterceptor)
export class ZhihuDailyController {
  constructor(private readonly zhihuDailyService: ZhihuDailyService) {}

  @Get('latest')
  @RedisKey(ZHIHU_DAILY_CACHE_KEY.LATEST)
  public async zhihuDailyLatest() {
    return await this.zhihuDailyService.latest()
  }
  // @Get('news/:id')
  // public async zhihuDailyFindContentById(@Param('id') id: string) {
  //   return await this.zhihuDailyService.fetchContentById(id)
  // }
  @Get('date/:date')
  public async zhihuDailyFindByDate(@Param('date') date: string) {
    return await this.zhihuDailyService.fetchByDate(date)
  }
}
