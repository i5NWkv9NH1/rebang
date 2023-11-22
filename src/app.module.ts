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

@Module({
  imports: [
    SharedModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)', '/public/(.*)'],
      serveStaticOptions: {
        // @ts-ignore
        decorateReply: false
      }
    }),
    SitesModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
  exports: [RedisService]
})
export class AppModule {}
