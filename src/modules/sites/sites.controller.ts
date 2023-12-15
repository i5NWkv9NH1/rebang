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
}
