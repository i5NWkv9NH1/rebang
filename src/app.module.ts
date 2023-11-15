import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SitesModule } from './modules/sites/sites.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './configuration'
import { PlaywrightModule } from 'nestjs-playwright'
import { CacheModule } from '@nestjs/cache-manager'
import { TasksModule } from './modules/tasks/tasks.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)', '/public/(.*)'],
      serveStaticOptions: {
        // @ts-ignore
        decorateReply: false
      }
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 3600,
      max: 9999
    }),
    SitesModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
