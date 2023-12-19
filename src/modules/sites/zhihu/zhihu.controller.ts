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
import { ZhihuTask } from './zhihu.task'
import { PaginateTransformInterceptor } from 'src/shared/paginate-transform.Interceptor'
import { SetCookieDto } from './zhihu.type'

@Controller('sites/zhihu')
export class ZhihuController {
  constructor(
    private readonly redisService: RedisService,
    private readonly zhihuService: ZhihuService,
    private readonly zhihuTask: ZhihuTask
  ) {}

  //#region web crawler
  @Get('billboard')
  public async billboard() {
    return await this.zhihuService.billboard()
  }
  //#endregion

  //#region auth
  @Get('cookie')
  public async getCookie() {
    return await this.zhihuService.getCookie()
  }
  @Post('cookie')
  public async setCookie(@Body() setCookieDto: SetCookieDto) {
    return await this.zhihuService.setCookie(setCookieDto)
  }

  @Get('hot')
  public async hot(@Query('pageSize') pageSize?: number) {
    return await this.zhihuService.hot(pageSize, true)
  }

  @Get('me')
  public async me() {
    return await this.zhihuService.me()
  }
  //#endregion
}
