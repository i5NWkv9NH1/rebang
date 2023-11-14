import { Module } from '@nestjs/common'
import { PlaywrightModule } from 'nestjs-playwright'
import { ITHomeService } from './ithome.service'
import { HttpModule } from '@nestjs/axios'
import { SitesController } from './sites.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpConfig } from 'src/configuration'
import { ZhihuService } from './zhihu.service'
import { WeiboService } from './weibo.service'
import { ScheduleModule } from '@nestjs/schedule'
import { HupuService } from './hupu.service'

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
    ScheduleModule.forRoot(),
    HttpModule
  ],
  controllers: [SitesController],
  providers: [ZhihuService, ITHomeService, WeiboService, HupuService],
  exports: [ZhihuService, ITHomeService, WeiboService, HupuService]
})
export class SitesModule {}
