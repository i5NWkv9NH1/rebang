import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bullmq'
import { TypeormConfigService } from 'src/configs/typeorm-config.service'
import { BullMqConfigService } from 'src/configs/bullmq-config.service'
import { MeiliSearchModule } from 'nestjs-meilisearch'
import { MeilliSearchConfigService } from 'src/configs/meilisearch-config.service'
import { PlaywrightModule } from 'nestjs-playwright'
import { RedisService } from './services/redis.service'
import { RedisConfigService } from 'src/configs/redis-config.service'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { FetchService } from './services/fetch.service'
import { HttpModule } from '@nestjs/axios'
import { HttpConfigService } from 'src/configs/http-config.service'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { SearchService } from './services/search.service'
import { ScheduleModule } from '@nestjs/schedule'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    RedisModule.forRootAsync({
      useClass: RedisConfigService
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService
    }),
    BullModule.forRootAsync({
      useClass: BullMqConfigService
    }),
    MeiliSearchModule.forRootAsync({
      useClass: MeilliSearchConfigService
    }),
    PlaywrightModule.forRoot({
      executablePath: `/opt/homebrew/Caskroom/google-chrome/129.0.6668.71/Google Chrome.app/Contents/MacOS/Google Chrome`,
      headless: true,
      chromiumSandbox: true,
      channel: 'chrome'
    }),
    HttpModule.registerAsync({
      useClass: HttpConfigService
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      global: true,
      wildcard: true,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false
    })
  ],
  providers: [RedisService, FetchService, SearchService],
  exports: [RedisService, FetchService, SearchService]
})
export class ShareModule {}
