import {
  Controller,
  Get,
  Query,
  SetMetadata,
  UseInterceptors
} from '@nestjs/common'
import { _36KService } from './_36k.service'
import {
  RedisCachingInterceptor,
  RedisKey
} from 'src/shared/redis-caching-interceptor'
import { CacheKey } from '@nestjs/cache-manager'
import { _36K_CACHE_KEY } from './_36k.constant'

//TODO: dynamic cache key
@Controller('sites/36k')
@UseInterceptors(RedisCachingInterceptor)
export class _36KController {
  constructor(private readonly _36kService: _36KService) {}

  //#region 36k
  @Get('latest')
  @RedisKey(_36K_CACHE_KEY.LATEST)
  public async _36kLatest(@Query('pageCallback') pageCallback: string) {
    return await this._36kService.latest(pageCallback)
  }
  // @Get('36k/today')
  // public async _36kToday() {
  //   return await this._36kService.today()
  // }
  @Get('rank/hot')
  @RedisKey(_36K_CACHE_KEY.RANK.HOT)
  public async _36kRankHot() {
    return await this._36kService.rankHot()
  }
  @Get('rank/video')
  @RedisKey(_36K_CACHE_KEY.RANK.VIDEO)
  public async _36kRankVideo() {
    return await this._36kService.rankVideo()
  }
  @Get('rank/comment')
  @RedisKey(_36K_CACHE_KEY.RANK.COMMENT)
  public async _36kRankComment() {
    return await this._36kService.rankComment()
  }
  @Get('rank/collect')
  @RedisKey(_36K_CACHE_KEY.RANK.COLLECT)
  public async _36kRankCollect() {
    return await this._36kService.rankCollect()
  }
  //#endregion
}
