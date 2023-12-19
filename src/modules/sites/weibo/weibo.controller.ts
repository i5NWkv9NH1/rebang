import { Body, Controller, Get, Post } from '@nestjs/common'
import { WeiboService } from './weibo.service'
import { GetVerifyCodeDto, LoginDto } from './weibo.type'

@Controller('sites/weibo')
export class WeiboController {
  constructor(private readonly weiboService: WeiboService) {}

  @Post('verify')
  public async getVerifyCode(@Body() getVerifyCodeDto: GetVerifyCodeDto) {
    return await this.weiboService.getVerifyCode(getVerifyCodeDto)
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    return await this.weiboService.login(loginDto)
  }

  @Get('cookie')
  public async getCookie() {
    return await this.weiboService.getCookie()
  }

  //#region weibo
  @Get('hotsearch')
  public async hotsearch() {
    return await this.weiboService.hotsearch()
  }
  @Get('socialevent')
  public async socialevent() {
    return await this.weiboService.socialevent()
  }

  @Get('entrank')
  public async entrank() {
    return await this.weiboService.entrank()
  }

  @Get('topicband')
  public async topicband() {
    return await this.weiboService.topicband()
  }
  //#endregion
}
