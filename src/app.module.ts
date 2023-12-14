import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SitesModule } from './modules/sites/sites.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './shared/configuration'
import { PlaywrightModule } from 'nestjs-playwright'
import { CacheModule } from '@nestjs/cache-manager'
import { TasksModule } from './modules/tasks/tasks.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { RedisService } from 'src/shared/redis.service'
import { SharedModule } from './shared/shared.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { HttpModule } from '@nestjs/axios'
import { WeatherModule } from './modules/weather/weather.module';

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

    ScheduleModule.forRoot(),
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
    SitesModule,
    TasksModule,
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
  exports: [RedisService]
})
export class AppModule {}
