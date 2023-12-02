import { Controller, Get, Query } from '@nestjs/common'
import { _36KService } from './_36k.service'

@Controller('sites/36k')
export class _36KController {
  constructor(private readonly _36kService: _36KService) {}

  //#region 36k
  @Get('latest')
  public async _36kLatest(@Query('pageCallback') pageCallback: string) {
    return await this._36kService.latest(pageCallback)
  }
  // TODO
  // @Get('36k/today')
  // public async _36kToday() {
  //   return await this._36kService.today()
  // }
  @Get('rank/hot')
  public async _36kRankHot() {
    return await this._36kService.rankHot()
  }
  @Get('rank/video')
  public async _36kRankVideo() {
    return await this._36kService.rankVideo()
  }
  @Get('rank/comment')
  public async _36kRankComment() {
    return await this._36kService.rankComment()
  }
  @Get('rank/collect')
  public async _36kRankCollect() {
    return await this._36kService.rankCollect()
  }
  //#endregion
}
