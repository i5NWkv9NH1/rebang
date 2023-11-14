import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { ITHomeService } from './ithome.service'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'
import { ZhihuService } from './zhihu.service'
import { WeiboService } from './weibo.service'

@Controller('sites')
@UseInterceptors(CacheInterceptor)
export class SitesController {
  constructor(
    private readonly ithomeService: ITHomeService,
    private readonly zhihuService: ZhihuService,
    private readonly weiboService: WeiboService
  ) {}

  // #region ithome
  @Get('ithome')
  public async ithome() {
    return await this.ithomeService.start()
  }

  @Get('ithome/day')
  public async ithomeDay() {
    return await this.ithomeService.day()
  }
  // #endregion

  // #region zhihu
  @Get('zhihu')
  public async zhihu() {
    return await this.zhihuService.start()
  }
  // #endregion

  //#region weibo
  @Get('weibo')
  public async start() {
    return await this.weiboService.start()
  }
  @Get('weibo/realtimehot')
  public async weiboRealtimehot() {
    return await this.weiboService.realtimehot()
  }
  @Get('weibo/socialevent')
  public async weiboSocialevent() {
    return await this.weiboService.socialevent()
  }

  @Get('weibo/entrank')
  public async weiboEntrank() {
    return await this.weiboService.entrank()
  }

  @Get('weibo/topicband')
  public async weiboTopicband() {
    return await this.weiboService.topicband()
  }
  //#endregion
}
