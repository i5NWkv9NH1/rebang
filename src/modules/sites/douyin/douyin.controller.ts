import { Controller, Get } from '@nestjs/common'
import { DouyinService } from './douyin.service'

@Controller('sites/douyin')
export class DouyinController {
  constructor(private readonly douyinService: DouyinService) {}

  @Get('cookie')
  public async getCookie() {
    return await this.douyinService.getCookie()
  }

  @Get('hot')
  public async hot() {
    return await this.douyinService.hot()
  }
}
