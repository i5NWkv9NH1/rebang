import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { ITHomeService } from './ithome.service'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'

@Controller('sites')
@UseInterceptors(CacheInterceptor)
export class SitesController {
  constructor(private readonly ithomeService: ITHomeService) {}

  @Get('ithome')
  @CacheKey('ithome')
  @CacheTTL(3600)
  public async start() {
    return await this.ithomeService.start()
  }

  @Get('ithome/day')
  @CacheKey('ithome/day')
  @CacheTTL(3600)
  public async day() {
    return await this.ithomeService.day()
  }
}
