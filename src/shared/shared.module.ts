import { Module } from '@nestjs/common'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { ConfigModule } from '@nestjs/config'
import configuration from './configuration'
import { RedisService } from './redis.service'

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: ''
      }
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    })
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class SharedModule {}
