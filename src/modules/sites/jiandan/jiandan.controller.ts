import { Controller, Get } from '@nestjs/common'
import { JiandanService } from './jiandan.service'

@Controller('sites/jiandan')
export class JiandanController {
  constructor(private readonly jiandanService: JiandanService) {}

  //#region 煎蛋
  @Get('4h')
  public async jiandan4h() {
    return await this.jiandanService._4h()
  }
  @Get('7d')
  public async jiandan7d() {
    return await this.jiandanService._7d()
  }
  @Get('3d')
  public async jiandan3d() {
    return await this.jiandanService._3d()
  }
  @Get('top')
  public async jiandanTop() {
    return await this.jiandanService.top()
  }
  @Get('ooxx')
  public async jiandanOOXX() {
    return await this.jiandanService.ooxx()
  }
  @Get('comments')
  public async jiandanComments() {
    return await this.jiandanService.comments()
  }
  @Get('tucao')
  public async jiandanTucao() {
    return await this.jiandanService.tucao()
  }
  //#endregion
}
