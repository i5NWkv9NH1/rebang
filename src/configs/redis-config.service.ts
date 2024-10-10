import {
  RedisModuleOptions,
  RedisOptionsFactory
} from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createRedisOptions(): RedisModuleOptions | Promise<RedisModuleOptions> {
    return {
      config: {
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT')
      }
    }
  }
}
