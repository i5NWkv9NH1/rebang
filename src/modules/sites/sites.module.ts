import { Module } from '@nestjs/common'
import { PlaywrightModule } from 'nestjs-playwright'
import { ITHomeService } from './ithome.service'
import { HttpModule } from '@nestjs/axios'
import { SitesController } from './sites.controller'
import { ZhihuService } from './zhihu.service'
import { WeiboService } from './weibo.service'
import { ScheduleModule } from '@nestjs/schedule'
import { HupuService } from './hupu.service'
import { BiliBiliService } from './bilibili.service'
import { JuejinService } from './juejin.service'
import { ToutiaoService } from './toutiao.service'
import { BaiduService } from './baidu.service'
import { ZhihuDailyService } from './zhihu-daily.service'
import { _36KService } from './_36k.service'
import { HuxiuService } from './huxiu.service'
import { SharedModule } from 'src/shared/shared.module'
import { PengpaiService } from './pengpai.service'
import { HistoryService } from './history.service'
import { PearvideoService } from './pearvideo.service'
import { SogouService } from './sogou.service'
import { _360Service } from './_360.service'
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
import { AcfunModule } from './acfun/acfun.module'
import { ZhihuModule } from './zhihu/zhihu.module'
import { ZhihuDailyModule } from './zhihu-daily/zhihu-daily.module'
import { _360Module } from './_360/_360.module'
import { BaiduController } from './baidu/baidu.controller'
import { BaiduModule } from './baidu/baidu.module'
import { BilibiliModule } from './bilibili/bilibili.module'
import { _36KModule } from './_36k/_36k.module'
import { HupuModule } from './hupu/hupu.module'
import { ITHomeModule } from './ithome/ithome.module'
import { DouyinModule } from './douyin/douyin.module';
import { HistoryModule } from './history/history.module';
import { JiandanModule } from './jiandan/jiandan.module';
import { HuxiuModule } from './huxiu/huxiu.module';
import { WeiboModule } from './weibo/weibo.module';
import { JuejinModule } from './juejin/juejin.module';
import { SspModule } from './ssp/ssp.module';
import { TiebaModule } from './tieba/tieba.module';
import { ToutiaoModule } from './toutiao/toutiao.module';
import { WereadModule } from './weread/weread.module';
import { XueqiuModule } from './xueqiu/xueqiu.module';
import { GhxiModule } from './ghxi/ghxi.module';
import { AgefansModule } from './agefans/agefans.module';
import { CaixinModule } from './caixin/caixin.module';
import { YicaiModule } from './yicai/yicai.module';
import { QqnewsModule } from './qqnews/qqnews.module';

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
    TiebaModule,
    ToutiaoModule,
    WereadModule,
    XueqiuModule,
    GhxiModule,
    AgefansModule,
    CaixinModule,
    YicaiModule,
    QqnewsModule
  ],
  controllers: [SitesController],
  providers: [
    BaiduService,
    BiliBiliService,
    HupuService,
    ITHomeService,
    JuejinService,
    _36KService,
    ToutiaoService,
    WeiboService,
    ZhihuDailyService,
    ZhihuService,
    HuxiuService,
    PengpaiService,
    HistoryService,
    PearvideoService,
    SogouService,
    _360Service,
    SspService,
    AcfunService,
    ShadiaoNewsService,
    JiandanService,
    XueqiuService,
    _163Service,
    WechatService,
    WereadService,
    DouyinService,
    TiebaService,
    TencentNewsService
  ],
  exports: [
    BaiduService,
    BiliBiliService,
    HupuService,
    ITHomeService,
    JuejinService,
    _36KService,
    ToutiaoService,
    WeiboService,
    ZhihuDailyService,
    ZhihuService,
    HuxiuService,
    PengpaiService,
    HistoryService,
    PearvideoService,
    SogouService,
    _360Service,
    SspService,
    AcfunService,
    ShadiaoNewsService,
    JiandanService,
    XueqiuService,
    _163Service,
    WechatService,
    WereadService,
    DouyinService,
    TiebaService,
    TencentNewsService
  ]
})
export class SitesModule {}
