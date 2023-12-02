import { Controller, Get } from '@nestjs/common'
import { AcFunService } from './acfun.service'
import { RedisService } from 'src/shared/redis.service'
import { ACFUN_CACHE_KEY } from './acfun.constant'

@Controller('sites/acfun')
export class AcfunController {
  constructor(
    private readonly acFunService: AcFunService,
    private readonly redisService: RedisService
  ) {}

  @Get('day')
  public async day() {
    return this.acFunService.fetchDay()
  }
  @Get('threedays')
  public async threeDays() {
    return this.acFunService.fetchThreeDays()
  }
  @Get('week')
  public async week() {
    return this.acFunService.fetchWeek()
  }
}
