import { Controller, Get, Query } from '@nestjs/common'
import { BaiduService } from './baidu.service'
import { BaiduRankTab } from './baidu.constant'

@Controller('sites/baidu')
export class BaiduController {
  constructor(private readonly baiduService: BaiduService) {}

  @Get('rank')
  public async rank(@Query('tab') tab: BaiduRankTab) {
    return await this.baiduService.rank(tab)
  }
}
