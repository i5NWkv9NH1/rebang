import { Controller, Get, Query } from '@nestjs/common'
import { ITHomeService } from './ithome.service'
import { ITHOME_TABS } from './ihome.constant'

@Controller('sites/ithome')
export class ITHomeController {
  constructor(private readonly itHomeService: ITHomeService) {}

  @Get('')
  public async bootstrap() {
    return await this.itHomeService.bootstrap()
  }

  @Get('rank')
  public async rank(@Query('tab') tab: ITHOME_TABS) {
    return await this.itHomeService.findByTab(tab)
  }
}
