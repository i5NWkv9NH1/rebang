import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common'
import { ITHomeService } from './ithome.service'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'
import { ZhihuService } from './zhihu.service'
import { WeiboService } from './weibo.service'
import { HupuService } from './hupu.service'
import { BiliBiliService } from './bilibili.service'
import { JuejinService } from './juejin.service'
import { ToutiaoService } from './toutiao.service'
import { BaiduService } from './baidu.service'
import { ZhihuDailyService } from './zhihu-daily.service'
import { HuxiuService } from './huxiu.service'
import { PengpaiService } from './pengpai.service'
import { HistoryService } from './history.service'

@Controller('sites')
export class SitesController {
  constructor(
    private readonly ithomeService: ITHomeService,
    private readonly zhihuService: ZhihuService,
    private readonly weiboService: WeiboService,
    private readonly hupuService: HupuService,
    private readonly bilibiliService: BiliBiliService,
    private readonly juejinService: JuejinService,
    private readonly toutiaoService: ToutiaoService,
    private readonly baiduService: BaiduService,
    private readonly zhihuDailyService: ZhihuDailyService,
    private readonly huxiuService: HuxiuService,
    private readonly pengpaiService: PengpaiService,
    private readonly historyService: HistoryService
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
  @Get('ithome/week')
  public async ithomeWeek() {
    return await this.ithomeService.week()
  }
  @Get('ithome/month')
  public async ithomeMonth() {
    return await this.ithomeService.month()
  }
  @Get('ithome/hot')
  public async ithomeHot() {
    return await this.ithomeService.hot()
  }
  // #endregion

  // #region zhihu
  @Get('zhihu')
  public async zhihu() {
    return await this.zhihuService.start()
  }
  // #endregion

  //#region weibo
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

  //#region bilibili
  // @Get('bilibili/rec')
  // public async bilibiliRec() {
  //   return await this.bilibiliService.rec()
  // }
  @Get('bilibili/hot')
  public async bilibiliHot() {
    return await this.bilibiliService.hot()
  }
  @Get('bilibili/week')
  public async bilibiliWeek() {
    return await this.bilibiliService.week()
  }
  @Get('bilibili/rank')
  public async bilibiliRank() {
    return await this.bilibiliService.rank()
  }
  //#endregion

  //#region juejin
  @Get('juejin/mix')
  public async juejinMix() {
    return await this.juejinService.mix()
  }
  @Get('juejin/be')
  public async juejinBE() {
    return await this.juejinService.be()
  }
  @Get('juejin/fe')
  public async juejinFE() {
    return await this.juejinService.fe()
  }
  @Get('juejin/android')
  public async juejinAndroid() {
    return await this.juejinService.android()
  }
  @Get('juejin/ios')
  public async juejiniOS() {
    return await this.juejinService.iOS()
  }
  @Get('juejin/ai')
  public async juejinAI() {
    return await this.juejinService.ai()
  }
  @Get('juejin/develop')
  public async juejinDevelop() {
    return await this.juejinService.develop()
  }
  @Get('juejin/code')
  public async juejinCode() {
    return await this.juejinService.code()
  }
  @Get('juejin/read')
  public async juejinRead() {
    return await this.juejinService.read()
  }

  //#region toutiao
  @Get('toutiao/hot')
  public async hot() {
    return await this.toutiaoService.hot()
  }
  //#endregion

  //#region baidu
  @Get('baidu/hot')
  public async baiduHot() {
    return await this.baiduService.hot()
  }
  @Get('baidu/novel')
  public async baiduNovel() {
    return await this.baiduService.novel()
  }
  @Get('baidu/movie')
  public async baiduMovie() {
    return await this.baiduService.movie()
  }
  @Get('baidu/teleplay')
  public async baiduTeleplay() {
    return await this.baiduService.teleplay()
  }
  @Get('baidu/car')
  public async baiduCard() {
    return await this.baiduService.car()
  }
  @Get('baidu/game')
  public async baiduGame() {
    return await this.baiduService.game()
  }
  //#endregion

  //#region zhihu daily
  @Get('zhihu-daily/latest')
  public async zhihuDailyLatest() {
    return await this.zhihuDailyService.latest()
  }
  @Get('zhihu-daily/news/:id')
  public async zhihuDailyFindContentById(@Param('id') id: string) {
    return await this.zhihuDailyService.findContentById(id)
  }
  @Get('zhihu-daily/date/:date')
  public async zhihuDailyFindByDate(@Param('date') date: string) {
    return await this.zhihuDailyService.findByDate(date)
  }
  //#endregion

  //#region huxiu
  @Get('huxiu/latest')
  public async huxiuLatest() {
    return await this.huxiuService.latest()
  }
  @Get('huxiu/hot')
  public async huxiuHot() {
    return await this.huxiuService.hot()
  }
  @Get('huxiu/event')
  public async huxiuEvent() {
    return await this.huxiuService.event()
  }
  //#endregion

  //TODO: 分页
  //TODO: 增加频道和节点
  //#region 澎湃
  //? 热榜
  @Get('pengpai/hot')
  public async pengpaiHot() {
    return await this.pengpaiService.hot()
  }
  //? 频道
  @Get('pengpai/channels/:id')
  public async channel(@Param('id') id: string) {
    console.log('channel id:: ', id)
    return await this.pengpaiService.getByChannelId()
  }
  //? 节点
  @Get('pengpai/nodes/:id')
  public async node(@Param('id') id: string) {
    console.log('channel id:: ', id)
    return await this.pengpaiService.getByNodeIdPortal()
  }
  //#endregion

  //#region 历史上的今天
  @Get('history')
  public async history() {
    return await this.historyService.start()
  }
  //#endregion
}
