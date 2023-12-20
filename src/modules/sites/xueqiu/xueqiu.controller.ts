import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { XueqiuService } from './xueqiu.service'
import { RedisCachingInterceptor } from 'src/shared/redis-caching-interceptor'

//TODO: dynamic redis key
@Controller('sites/xueqiu')
@UseInterceptors(RedisCachingInterceptor)
export class XueqiuController {
  constructor(private readonly xueqiuService: XueqiuService) {}

  //#region Xueqiu
  @Get('cookie')
  public async xueqiuCookie() {
    return await this.xueqiuService.getCookie()
  }
  @Get('livenews')
  public async xueqiuLivenews() {
    return await this.xueqiuService.livenews()
  }
  @Get('notice')
  public async xueqiuNotice() {
    return await this.xueqiuService.notice()
  }
  @Get('news')
  public async xueqiuNews() {
    return await this.xueqiuService.news()
  }
  @Get('hotstock')
  public async xueqiuHotStock() {
    return await this.xueqiuService.hotStock()
  }
  //#endregion
}
