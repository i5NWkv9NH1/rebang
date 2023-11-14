import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SitesModule } from './modules/sites/sites.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './configuration'
import { PlaywrightModule } from 'nestjs-playwright'
import { CacheModule } from '@nestjs/cache-manager'
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
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
