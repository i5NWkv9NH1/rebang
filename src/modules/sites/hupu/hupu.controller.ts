import { Controller, Get, Query } from '@nestjs/common'
import { HupuService } from './hupu.service'
import { HUPU_TABS } from './hupu.constant'

@Controller('sites/hupu')
export class HupuController {
  constructor(private readonly hupuService: HupuService) {}
  @Get('plate')
  public async plate(@Query('tab') tab: HUPU_TABS) {
    return await this.hupuService.plate(tab.toUpperCase() as HUPU_TABS)
  }
  //#endregion
}
