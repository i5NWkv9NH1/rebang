import { _163Service } from './_163.service'
import { _360Module } from './_360/_360.module'
import { _360Service } from './_360.service'
import { _36KModule } from './_36k/_36k.module'
import { _36KService } from './_36k.service'
import { AcfunModule } from './acfun/acfun.module'
import { AgefansModule } from './agefans/agefans.module'
import { BaiduModule } from './baidu/baidu.module'
import { BilibiliModule } from './bilibili/bilibili.module'
import { CaixinModule } from './caixin/caixin.module'
import { DouyinModule } from './douyin/douyin.module'
import { GhxiModule } from './ghxi/ghxi.module'
import { HistoryModule } from './history/history.module'
import { HupuModule } from './hupu/hupu.module'
import { HuxiuModule } from './huxiu/huxiu.module'
import { ITHomeModule } from './ithome/ithome.module'
import { JiandanModule } from './jiandan/jiandan.module'
import { JuejinModule } from './juejin/juejin.module'
import { Module } from '@nestjs/common'
import { NeteaseModule } from './netease/netease.module'
import { PearvideoModule } from './pearvideo/pearvideo.module'
import { PengpaiModule } from './pengpai/pengpai.module'
import { ShadiaonewsModule } from './shadiaonews/shadiaonews.module'
import { SharedModule } from 'src/shared/shared.module'
import { SogouModule } from './sogou/sogou.module'
import { SspModule } from './ssp/ssp.module'
import { TencentModule } from './tencent/tencent.module'
import { ToutiaoModule } from './toutiao/toutiao.module'
import { WeiboModule } from './weibo/weibo.module'
import { XueqiuModule } from './xueqiu/xueqiu.module'
import { YicaiModule } from './yicai/yicai.module'
import { ZakerModule } from './zaker/zaker.module'
import { ZhihuDailyModule } from './zhihu-daily/zhihu-daily.module'
import { ZhihuModule } from './zhihu/zhihu.module'

@Module({
  imports: [
    _360Module,
    _36KModule,
    AcfunModule,
    BaiduModule,
    BilibiliModule,
    SharedModule,
    ZhihuDailyModule,
    ZhihuModule,
    HupuModule,
    ITHomeModule,
    DouyinModule,
    HistoryModule,
    JiandanModule,
    HuxiuModule,
    WeiboModule,
    JuejinModule,
    SspModule,
    ToutiaoModule,
    XueqiuModule,
    GhxiModule,
    AgefansModule,
    CaixinModule,
    YicaiModule,
    ZakerModule,
    PengpaiModule,
    PearvideoModule,
    SogouModule,
    ShadiaonewsModule,
    NeteaseModule,
    TencentModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class SitesModule {}
