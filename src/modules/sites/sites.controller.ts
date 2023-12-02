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

  //#region toutiao

  //#endregion

  //#region baidu

  //#endregion

  //#region tieba

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

  //#region acfun

  //#endregion

  //#region 沙雕新闻
  @Get('shadiaonews')
  public async shadiaoNews() {
    return await this.shadiaoNewsService.start()
  }
  //#endregion

  //#region tencent-news
  @Get('tencent-news/hot')
  public async tencentNewsHot() {
    return await this.tencentNewsService.hot()
  }
  //#endregion
}
