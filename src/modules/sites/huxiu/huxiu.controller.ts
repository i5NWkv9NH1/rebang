import { Controller, Get } from '@nestjs/common'
import { HuxiuService } from './huxiu.service'

//TODO: channel
//TODO: paginate
@Controller('sites/huxiu')
export class HuxiuController {
  constructor(private readonly huxiuService: HuxiuService) {}
  //#region huxiu
  @Get('latest')
  public async huxiuLatest() {
    return await this.huxiuService.latest()
  }

  // @Get('huxiu/channel')
  // public async huxiuChannel() {
  //   return await this.huxiuService.channel()
  // }
  @Get('event')
  public async huxiuEvent() {
    return await this.huxiuService.event()
  }
  @Get('timeline')
  public async huxiuTimeline() {
    return await this.huxiuService.timeline()
  }
  //#endregion
}
