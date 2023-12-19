import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'
import { Module } from '@nestjs/common'
import { PlaywrightModule } from 'nestjs-playwright'
import { RedisService } from 'src/shared/redis.service'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { SharedModule } from './shared/shared.module'
import { SitesModule } from './modules/sites/sites.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WeatherModule } from './modules/weather/weather.module'
import configuration from './shared/configuration'
import { BullModule } from '@nestjs/bull'

@Module({
  imports: [
    SharedModule,
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
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    // ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)', '/public/(.*)'],
      serveStaticOptions: {
        // @ts-ignore
        decorateReply: false
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'aaa123',
      database: 'postgres',
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{js,ts}']
    }),
    TasksModule,
    SitesModule,
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
