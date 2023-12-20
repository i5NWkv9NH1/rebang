import { Global, Module } from '@nestjs/common'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { RedisService } from './redis.service'
import { HttpModule } from '@nestjs/axios'
import { FetchService } from './fetch.service'
import { BullModule } from '@nestjs/bull'
import { BullBoardModule } from '@bull-board/nestjs'
import { ExpressAdapter } from '@bull-board/express'
import { RedisCachingInterceptor } from './redis-caching-interceptor'

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: ''
      }
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter
    }),
    {
      ...HttpModule.register({}),
      global: true
    }
  ],
  providers: [RedisService, FetchService, RedisCachingInterceptor],
  exports: [RedisService, FetchService, RedisCachingInterceptor]
})
export class SharedModule {}
