import { Global, Module } from '@nestjs/common'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { ConfigModule } from '@nestjs/config'
import configuration from './configuration'
import { RedisService } from './redis.service'
import { HttpModule } from '@nestjs/axios'
import { FetchService } from './fetch.service'

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
    {
      ...HttpModule.register({}),
      global: true
    }
  ],
  providers: [RedisService, FetchService],
  exports: [RedisService, FetchService]
})
export class SharedModule {}
