import { Controller, Get } from '@nestjs/common'
import { WereadService } from './weread.service'

@Controller('sites/weread')
export class WereadController {
  constructor(private readonly wereadService: WereadService) {}
  //#region weread
  @Get('rising')
  public async rising() {
    return await this.wereadService.rising()
  }
  //#endregion
}
