import { Controller, Get } from '@nestjs/common'
import { WeiboService } from './weibo.service'

@Controller('sites/weibo')
export class WeiboController {
  constructor(private readonly weiboService: WeiboService) {}

  //#region weibo
  @Get('realtimehot')
  public async weiboRealtimehot() {
    return await this.weiboService.realtimehot()
  }
  @Get('socialevent')
  public async weiboSocialevent() {
    return await this.weiboService.socialevent()
  }

  @Get('entrank')
  public async weiboEntrank() {
    return await this.weiboService.entrank()
  }

  @Get('topicband')
  public async weiboTopicband() {
    return await this.weiboService.topicband()
  }
  //#endregion
}
