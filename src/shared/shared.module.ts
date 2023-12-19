import { Global, Module } from '@nestjs/common'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { RedisService } from './redis.service'
import { HttpModule } from '@nestjs/axios'
import { FetchService } from './fetch.service'
import { BullModule } from '@nestjs/bull'

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
    {
      ...HttpModule.register({}),
      global: true
    }
  ],
  providers: [RedisService, FetchService],
  exports: [RedisService, FetchService, BullModule]
})
export class SharedModule {}
