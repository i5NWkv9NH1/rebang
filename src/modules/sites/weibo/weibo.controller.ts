import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common'
import { WeiboService } from './weibo.service'
import { GetVerifyCodeDto, LoginDto } from './weibo.type'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { WEIBO_CACHE_KEY } from './weibo.constant'

//TODO: dynamic redis key
@Controller('sites/weibo')
@UseInterceptors(RedisCachingInterceptor)
export class WeiboController {
  constructor(private readonly weiboService: WeiboService) {}

  @Post('verify')
  public async getVerifyCode(@Body() getVerifyCodeDto: GetVerifyCodeDto) {
    return await this.weiboService.getVerifyCode(getVerifyCodeDto)
  }

  @Post('login')
  @RedisKey(WEIBO_CACHE_KEY.LOGIN)
  public async login(@Body() loginDto: LoginDto) {
    return await this.weiboService.login(loginDto)
  }

  @Get('cookie')
  @RedisKey(WEIBO_CACHE_KEY.COOKIE)
  public async getCookie() {
    return await this.weiboService.getCookie()
  }

  //#region weibo
  @Get('hotsearch')
  @RedisKey(WEIBO_CACHE_KEY.HOT_SEARCH)
  public async hotsearch() {
    return await this.weiboService.hotsearch()
  }
  @Get('socialevent')
  @RedisKey(WEIBO_CACHE_KEY.NEWS)
  public async socialevent() {
    return await this.weiboService.socialevent()
  }

  @Get('entrank')
  @RedisKey(WEIBO_CACHE_KEY.ENTRANK)
  public async entrank() {
    return await this.weiboService.entrank()
  }

  @Get('topicband')
  @RedisKey(WEIBO_CACHE_KEY.TOPIC_BAND)
  public async topicband() {
    return await this.weiboService.topicband()
  }
  //#endregion
}
