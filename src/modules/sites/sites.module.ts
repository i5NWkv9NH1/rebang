import { _360Module } from './_360/_360.module'
import { _36KModule } from './_36k/_36k.module'
import { AcfunModule } from './acfun/acfun.module'
import { AgefansModule } from './agefans/agefans.module'
import { BaiduModule } from './baidu/baidu.module'
import { BilibiliModule } from './bilibili/bilibili.module'
import { CaixinModule } from './caixin/caixin.module'
import { DouyinModule } from './douyin/douyin.module'
import { GhxiModule } from './ghxi/ghxi.module'
import { GovModule } from './gov/gov.module'
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
import { SitesController } from './sites.controller'
import { SitesEntity } from './sites.entity'
import { SitesService } from './sites.service'
import { SogouModule } from './sogou/sogou.module'
import { SspModule } from './ssp/ssp.module'
import { TencentModule } from './tencent/tencent.module'
import { ToutiaoModule } from './toutiao/toutiao.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WeiboModule } from './weibo/weibo.module'
import { XueqiuModule } from './xueqiu/xueqiu.module'
import { YicaiModule } from './yicai/yicai.module'
import { ZakerModule } from './zaker/zaker.module'
import { ZhihuDailyModule } from './zhihu-daily/zhihu-daily.module'
import { ZhihuModule } from './zhihu/zhihu.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([SitesEntity]),
    _360Module,
    _36KModule,
    AcfunModule,
    AgefansModule,
    BaiduModule,
    BilibiliModule,
    CaixinModule,
    DouyinModule,
    GhxiModule,
    GovModule,
    HistoryModule,
    HupuModule,
    HuxiuModule,
    ITHomeModule,
    JiandanModule,
    JuejinModule,
    NeteaseModule,
    PearvideoModule,
    PengpaiModule,
    ShadiaonewsModule,
    SogouModule,
    SspModule,
    TencentModule,
    ToutiaoModule,
    WeiboModule,
    XueqiuModule,
    YicaiModule,
    ZakerModule,
    ZhihuDailyModule,
    ZhihuModule
  ],
  providers: [SitesService],
  exports: [SitesService],
  controllers: [SitesController]
})
export class SitesModule {}
