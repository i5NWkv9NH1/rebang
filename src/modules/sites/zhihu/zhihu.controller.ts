import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { ZhihuService } from './zhihu.service'
import { RedisService } from 'src/shared/redis.service'
import { PaginateTransformInterceptor } from 'src/shared/paginate-transform.Interceptor'
import { SetCookieDto } from './zhihu.type'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { ZHIHU_CACHE_KEY } from './zhihu.constant'

//TODO: dynamic redis key
@Controller('sites/zhihu')
@UseInterceptors(RedisCachingInterceptor)
export class ZhihuController {
  constructor(private readonly zhihuService: ZhihuService) {}

  //#region web crawler
  @Get('billboard')
  @RedisKey(ZHIHU_CACHE_KEY.BILLBOARD)
  public async billboard() {
    return await this.zhihuService.billboard()
  }
  //#endregion

  //#region auth
  @Get('cookie')
  @RedisKey(ZHIHU_CACHE_KEY.COOKIE)
  public async getCookie() {
    return await this.zhihuService.getCookie()
  }
  @Post('cookie')
  public async setCookie(@Body() setCookieDto: SetCookieDto) {
    return await this.zhihuService.setCookie(setCookieDto)
  }

  @Get('rank')
  @RedisKey(ZHIHU_CACHE_KEY.RANK)
  public async rank(@Query('pageSize') pageSize?: number) {
    return await this.zhihuService.rank(pageSize, true)
  }

  @Get('me')
  @RedisKey(ZHIHU_CACHE_KEY.ME)
  public async me() {
    return await this.zhihuService.me()
  }
  //#endregion
}
