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
import { KrService } from './kr.service'
import { HuxiuService } from './huxiu.service'
import { SharedModule } from 'src/shared/shared.module'
import { PengpaiService } from './pengpai.service'

@Module({
  imports: [
    PlaywrightModule.forRoot(
      {
        headless: true,
        channel: 'chrome',
        isGlobal: true,
        executablePath:
          'C:\\Users\\sora\\scoop\\apps\\googlechromecanary-portable\\current\\chrome.exe'
      } // optional, any Playwright launch options here or leave empty for good defaults */,
      //? optional, can be useful for using Chrome and Firefox in the same project
      // 'TopHub'
    ),
    SharedModule,
    HttpModule
  ],
  controllers: [SitesController],
  providers: [
    BaiduService,
    BiliBiliService,
    HupuService,
    ITHomeService,
    JuejinService,
    KrService,
    ToutiaoService,
    WeiboService,
    ZhihuDailyService,
    ZhihuService,
    HuxiuService,
    PengpaiService
  ],
  exports: [
    BaiduService,
    BiliBiliService,
    HupuService,
    ITHomeService,
    JuejinService,
    KrService,
    ToutiaoService,
    WeiboService,
    ZhihuDailyService,
    ZhihuService,
    HuxiuService,
    PengpaiService
  ]
})
export class SitesModule {}
