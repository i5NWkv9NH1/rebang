import { Controller, Get } from '@nestjs/common'
import { BilibiliService } from './bilibili.service'

@Controller('sites/bilibili')
export class BilibiliController {
  constructor(private readonly bilibiliService: BilibiliService) {}

  //TODO: paginate
  @Get('hot')
  public async hot() {
    return await this.bilibiliService.hot()
  }
  @Get('week')
  public async week() {
    return await this.bilibiliService.week()
  }
  @Get('rank')
  public async rank() {
    return await this.bilibiliService.rank()
  }
}
