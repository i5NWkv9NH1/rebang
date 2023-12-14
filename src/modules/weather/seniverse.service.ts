import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'

export const SENIVERSE_API = {
  NOW: `https://api.seniverse.com/v3/weather/now.json`,
  DAILY: `https://api.seniverse.com/v3/weather/daily.json`,
  CITY: `https://api.seniverse.com/v3/location/search.json`
} as const
export const SENIVERSE_KEY = {
  PUBLICK_KEY: `PbMBv3ffNEK2R-q3Y`,
  PRIVATE_KEY: `SHdwOLN6J3vdlEhmH`
} as const

//* 心和天气
@Injectable()
export class SeniverseSerivce {
  private readonly logger = new Logger(SeniverseSerivce.name)
  private readonly defaultHeaders = {
    'User-Agent': genUserAgent('mobile')
  }
  private readonly defaultQuery = {
    key: SENIVERSE_KEY.PRIVATE_KEY
  }
  private readonly defaultPagniate = {
    limit: 50,
    offset: 0
  }

  constructor(
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  //#region 天气实况
  public async now(
    location: string,
    language: string = 'zh-Hans',
    unit: string = 'c'
  ) {
    const query = {
      ...this.defaultQuery,
      location,
      language,
      unit
    }

    const response = await this.fetchService.get(SENIVERSE_API.NOW, {
      params: query,
      headers: this.defaultHeaders
    })
    return response.data
  }

  public async daily(
    location: string,
    days: number = 5,
    language: string = 'zh-Hans',
    unit: string = 'c'
  ) {
    const query = { ...this.defaultQuery, location, language, unit, days }
    const response = await this.fetchService.get(SENIVERSE_API.DAILY, {
      params: query,
      headers: this.defaultHeaders
    })
    return response.data
  }

  //#endregion

  //#region 功能类
  //* 城市搜索
  public async findCity(city: string) {
    const query = {
      ...this.defaultQuery,
      q: city
    }
    const response = await this.fetchService.get(SENIVERSE_API.CITY, {
      params: query,
      headers: this.defaultHeaders
    })
    return response.data
  }

  //* 自然语言天气查询
  //#endregion
}
