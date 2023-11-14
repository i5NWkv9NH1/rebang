import { Module } from '@nestjs/common'
import { PlaywrightModule } from 'nestjs-playwright'
import { ITHomeService } from './ithome.service'
import { HttpModule } from '@nestjs/axios'
import { SitesController } from './sites.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpConfig } from 'src/configuration'
import { ZhihuService } from './zhihu.service'
import { WeiboService } from './weibo.service'

@Module({
  imports: [
    //# region async
    // PlaywrightModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (config: ConfigService) => {
    //     const {
    //       proxy: { server }
    //     } = config.get<HttpConfig>('http');
    //     return {
    //       launchOptions: {
    //         headless: true,
    //         channel: 'chrome',
    //         proxy: {
    //           server
    //         }
    //       },
    //       instanceName: 'TopHub',
    //       isGlobal: true
    //     };
    //   },
    //   inject: [ConfigService]
    // }),
    // #end
    PlaywrightModule.forRoot(
      {
        headless: true,
        channel: 'chrome',
        isGlobal: true,
        executablePath:
          'C:\\Users\\sora\\scoop\\apps\\googlechromecanary-portable\\current\\chrome.exe'
      }, // optional, any Playwright launch options here or leave empty for good defaults */,
      'TopHub' // optional, can be useful for using Chrome and Firefox in the same project
    ),
    HttpModule
  ],
  providers: [ZhihuService, ITHomeService, WeiboService],
  controllers: [SitesController]
})
export class SitesModule {}
