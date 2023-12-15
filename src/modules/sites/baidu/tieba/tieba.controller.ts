import { Controller, Get } from '@nestjs/common'
import { TiebaService } from './tieba.service'

@Controller('sites/baidu/tieba')
export class TiebaController {
  constructor(private readonly tiebaService: TiebaService) {}

  @Get('hot')
  public async tiebaHot() {
    return await this.tiebaService.hot()
  }
}
