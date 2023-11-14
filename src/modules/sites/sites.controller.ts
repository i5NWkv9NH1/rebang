import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { ITHomeService } from './ithome.service'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'
import { ZhihuService } from './zhihu.service'
import { WeiboService } from './weibo.service'
import { HupuService } from './hupu.service'

@Controller('sites')
@UseInterceptors(CacheInterceptor)
export class SitesController {
  constructor(
    private readonly ithomeService: ITHomeService,
    private readonly zhihuService: ZhihuService,
    private readonly weiboService: WeiboService,
    private readonly hupuService: HupuService
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

  //#region Hupu
  @Get('hupu/sports')
  public async hupuSports() {
    return await this.hupuService.sports()
  }
  @Get('hupu/gambia')
  public async hupuGambia() {
    return await this.hupuService.gambia()
  }
  @Get('hupu/ent')
  public async hupuEnt() {
    return await this.hupuService.ent()
  }
  @Get('hupu/lol')
  public async hupuLOL() {
    return await this.hupuService.lol()
  }
  @Get('hupu/game')
  public async hupuGame() {
    return await this.hupuService.game()
  }
  @Get('hupu/nba')
  public async hupuNBA() {
    return await this.hupuService.nba()
  }
  @Get('hupu/gear')
  public async hupuGear() {
    return await this.hupuService.gear()
  }
  @Get('hupu/soccer')
  public async hupuSoccer() {
    return await this.hupuService.soccer()
  }
  @Get('hupu/digital')
  public async hupuDigital() {
    return await this.hupuService.digital()
  }
  //#endregion
}
