import { Controller, Get } from '@nestjs/common'
import { AcFunService } from './acfun.service'
import { RedisService } from 'src/shared/redis.service'
import { ACFUN_CACHE_KEY } from './acfun.constant'

@Controller('/sites/acfun')
export class AcfunController {
  constructor(
    private readonly acFunService: AcFunService,
    private readonly redisService: RedisService
  ) {}

  @Get('today')
  public async today() {
    return await this.redisService.get(ACFUN_CACHE_KEY.RANK.DAY)
  }
  @Get('threedays')
  public async threedays() {}
  @Get('week')
  public async week() {}
}
