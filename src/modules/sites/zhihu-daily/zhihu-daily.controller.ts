import { Controller, Get, Param } from '@nestjs/common'
import { ZhihuDailyService } from './zhihu-daily.service'

@Controller('sites/zhihu-daily')
export class ZhihuDailyController {
  constructor(private readonly zhihuDailyService: ZhihuDailyService) {}

  @Get('latest')
  public async zhihuDailyLatest() {
    return await this.zhihuDailyService.fetchLatest()
  }
  // @Get('news/:id')
  // public async zhihuDailyFindContentById(@Param('id') id: string) {
  //   return await this.zhihuDailyService.fetchContentById(id)
  // }
  @Get('date/:date')
  public async zhihuDailyFindByDate(@Param('date') date: string) {
    return await this.zhihuDailyService.fetchByDate(date)
  }
}
