import { Controller, Get } from '@nestjs/common'
import { ToutiaoService } from './toutiao.service'

@Controller('sites/toutiao')
export class ToutiaoController {
  constructor(private readonly toutiaoService: ToutiaoService) {}
  @Get('hot')
  public async hot() {
    return await this.toutiaoService.hot()
  }
}
