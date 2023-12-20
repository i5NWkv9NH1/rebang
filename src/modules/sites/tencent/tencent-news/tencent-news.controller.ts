import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { TencentNewsService } from './tencent-news.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { TENCENT_NEWS_CACHE_KEY } from './tencent-news.constant'

@Controller('sites/tencent/news')
@UseInterceptors(RedisCachingInterceptor)
export class TencentNewsController {
  constructor(private readonly tencentNewsService: TencentNewsService) {}

  @Get('rank')
  @RedisKey(TENCENT_NEWS_CACHE_KEY.HOT_RANK_LIST)
  public async rank() {
    return await this.tencentNewsService.rank()
  }

  @Get('questions')
  @RedisKey(TENCENT_NEWS_CACHE_KEY.HOT_QUESTION_LIST)
  public async questions() {
    return await this.tencentNewsService.questions()
  }
}
