import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { GhxiService } from './ghxi.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { GHXI_CACHE_KEY } from './ghxi.constant'

@Controller('sites/ghxi')
@UseInterceptors(RedisCachingInterceptor)
export class GhxiController {
  constructor(private readonly ghxiService: GhxiService) {}

  @Get('latest')
  @RedisKey(GHXI_CACHE_KEY.LATEST)
  async latest() {
    return await this.ghxiService.latest()
  }
  @Get('pc')
  @RedisKey(GHXI_CACHE_KEY.PC)
  async pc() {
    return await this.ghxiService.pc()
  }
  @Get('android')
  @RedisKey(GHXI_CACHE_KEY.ANDROID)
  async android() {
    return await this.ghxiService.android()
  }
}
