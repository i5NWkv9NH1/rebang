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
import { PearvideoService } from './pearvideo.service'
import { SogouService } from './sogou.service'
import { _360Service } from './_360.service'
import { _36KService } from './_36k.service'
import { SspService } from './ssp.service'
import { AcfunService } from './acfun.service'
import { ShadiaoNewsService } from './shadiaonews.service'
import { JiandanService } from './jiandan.service'
import { XueqiuService } from './xueqiu.service'
import { _163Service } from './_163.service'
import { WechatService } from './wechat.service'
import { WereadService } from './weread.service'
import { DouyinService } from './douyin.service'
import { TiebaService } from './tieba.service'
import { TencentNewsService } from './tencent-news.service'

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
    private readonly historyService: HistoryService,
    private readonly pearvideoService: PearvideoService,
    private readonly sogouService: SogouService,
    private readonly _360service: _360Service,
    private readonly _36kservice: _36KService,
    private readonly _163service: _163Service,
    private readonly sspService: SspService,
    private readonly acfunService: AcfunService,
    private readonly shadiaoNewsService: ShadiaoNewsService,
    private readonly jiandanService: JiandanService,
    private readonly wechatService: WechatService,
    private readonly wereadService: WereadService,
    private readonly xueqiuService: XueqiuService,
    private readonly douyinService: DouyinService,
    private readonly tiebaService: TiebaService,
    private readonly tencentNewsService: TencentNewsService
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
  @Get('zhihu/rank')
  public async zhihu() {
    return await this.zhihuService.rank()
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

  //#region tieba
  @Get('tieba/hot')
  public async tiebaHot() {
    return await this.tiebaService.hot()
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
  @Get('huxiu/channel')
  public async huxiuChannel() {
    return await this.huxiuService.channel()
  }
  @Get('huxiu/event')
  public async huxiuEvent() {
    return await this.huxiuService.event()
  }
  @Get('huxiu/timeline')
  public async huxiuTimeline() {
    return await this.huxiuService.timeline()
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

  //#region  梨视频
  @Get('pearvideo/rank')
  public async pearvideoRank() {
    return await this.pearvideoService.rank()
  }
  //#endregion

  //#region 搜狗
  @Get('sogou')
  public async sogou() {
    return await this.sogouService.start()
  }
  //#endregion

  //#region 360
  @Get('360/rank')
  public async _360Rank() {
    return await this._360service.rank()
  }
  //#endregion

  //#region 36k
  @Get('36k/latest')
  public async _36kLatest(@Query('pageCallback') pageCallback: string) {
    return await this._36kservice.latest(pageCallback)
  }
  // TODO
  @Get('36k/today')
  public async _36kToday() {
    return await this._36kservice.today()
  }
  @Get('36k/rank/hot')
  public async _36kRankHot() {
    return await this._36kservice.rankHot()
  }
  @Get('36k/rank/video')
  public async _36kRankVideo() {
    return await this._36kservice.rankVideo()
  }
  @Get('36k/rank/comment')
  public async _36kRankComment() {
    return await this._36kservice.rankComment()
  }
  @Get('36k/rank/collect')
  public async _36kRankCollect() {
    return await this._36kservice.rankCollect()
  }
  //#endregion

  //#region ssp
  @Get('ssp/hot')
  public async sspHot() {
    return await this.sspService.hot()
  }
  @Get('ssp/rec')
  public async sspRec() {
    return await this.sspService.rec()
  }
  //#endregion

  //#region acfun

  //#endregion

  //#region 沙雕新闻
  @Get('shadiaonews')
  public async shadiaoNews() {
    return await this.shadiaoNewsService.start()
  }
  //#endregion

  //#region 煎蛋
  @Get('jiandan/4h')
  public async jiandan4h() {
    return await this.jiandanService._4h()
  }
  @Get('jiandan/7d')
  public async jiandan7d() {
    return await this.jiandanService._7d()
  }
  @Get('jiandan/3d')
  public async jiandan3d() {
    return await this.jiandanService._3d()
  }
  @Get('jiandan/top')
  public async jiandanTop() {
    return await this.jiandanService.top()
  }
  @Get('jiandan/ooxx')
  public async jiandanOOXX() {
    return await this.jiandanService.ooxx()
  }
  @Get('jiandan/comments')
  public async jiandanComments() {
    return await this.jiandanService.comments()
  }
  @Get('jiandan/tucao')
  public async jiandanTucao() {
    return await this.jiandanService.tucao()
  }
  //#endregion

  //#region Xueqiu
  @Get('xueqiu/cookie')
  public async xueqiuCookie() {
    return await this.xueqiuService.getCookie()
  }
  @Get('xueqiu/livenews')
  public async xueqiuLivenews() {
    return await this.xueqiuService.livenews()
  }
  @Get('xueqiu/notice')
  public async xueqiuNotice() {
    return await this.xueqiuService.notice()
  }
  @Get('xueqiu/news')
  public async xueqiuNews() {
    return await this.xueqiuService.news()
  }
  @Get('xueqiu/hotstock')
  public async xueqiuHotStock() {
    return await this.xueqiuService.hotStock()
  }
  //#endregion

  //#region weread
  @Get('weread')
  public async rising() {
    return await this.wereadService.rising()
  }
  //#endregion

  //#region douyin
  @Get('douyin/cookie')
  public async douyinCookie() {
    return await this.douyinService.getCookie()
  }
  @Get('douyin/hot')
  public async douyinHot() {
    return await this.douyinService.hot()
  }
  //#endregion

  //#region tencent-news
  @Get('tencent-news/hot')
  public async tencentNewsHot() {
    return await this.tencentNewsService.hot()
  }
  //#endregion
}
