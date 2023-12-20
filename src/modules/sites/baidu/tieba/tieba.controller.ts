import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { TiebaService } from './tieba.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { TIEBA_CACHE_KEY } from './tieba.constant'

@Controller('sites/baidu/tieba')
@UseInterceptors(RedisCachingInterceptor)
export class TiebaController {
  constructor(private readonly tiebaService: TiebaService) {}

  @Get('topic-list')
  @RedisKey(TIEBA_CACHE_KEY.TOPIC_LIST)
  public async topicList() {
    return await this.tiebaService.topicList()
  }
}
