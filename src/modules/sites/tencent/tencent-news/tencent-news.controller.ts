import { Controller, Get } from '@nestjs/common'
import { TencentNewsService } from './tencent-news.service'

@Controller('sites/tencent/news')
export class TencentNewsController {
  constructor(private readonly tencentNewsService: TencentNewsService) {}

  @Get('rank')
  public async rank() {
    return await this.tencentNewsService.rank()
  }

  @Get('questions')
  public async questions() {
    return await this.tencentNewsService.questions()
  }
}
