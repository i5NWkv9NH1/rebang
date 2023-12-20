import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { NeteaseNewsService } from './netease-news.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { NETEASE_NEWS_CACHE_KEY } from './netease-news.constant'

@Controller('sites/netease/news')
@UseInterceptors(RedisCachingInterceptor)
export class NeteaseNewsController {
  constructor(private readonly neteaseNewsService: NeteaseNewsService) {}

  @Get('hot')
  @RedisKey(NETEASE_NEWS_CACHE_KEY.HOT)
  async hot() {
    return await this.neteaseNewsService.hot()
  }
  @Get('comment')
  @RedisKey(NETEASE_NEWS_CACHE_KEY.COMMENT)
  async comment() {
    return await this.neteaseNewsService.comment()
  }
  @Get('search')
  @RedisKey(NETEASE_NEWS_CACHE_KEY.SEARCH)
  async search() {
    return await this.neteaseNewsService.search()
  }
  @Get('video')
  @RedisKey(NETEASE_NEWS_CACHE_KEY.VIDEO)
  async video() {
    return await this.neteaseNewsService.video()
  }
  @Get('topic')
  @RedisKey(NETEASE_NEWS_CACHE_KEY.TOPIC)
  async topic() {
    return await this.neteaseNewsService.topic()
  }
}
