import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'
import { SspPaginationRequestPayload, SspPaginationResponse } from 'src/types'
import { genUserAgent } from 'src/helpers'

//TODO: pagination
@Injectable()
export class SspService {
  private logger = new Logger(SspService.name)

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  public async hot(
    payload: SspPaginationRequestPayload = {
      limit: 10,
      offset: 0,
      created_at: Math.ceil(new Date().getTime() / 1000),
      tag: '热门文章',
      released: false
    }
  ) {
    const cache = await this.redisService.get('ssp/hot')
    if (cache) return cache

    const url = `https://sspai.com/api/v1/article/tag/page/get`
    const headers = { 'user-agent': genUserAgent('mobile') }
    const response = await this.get<SspPaginationResponse>(
      url,
      payload,
      headers
    )

    const data = response.data.data.map((item) => {
      const subtitle = item.summary
      const thumbnail = item.banner
      return { subtitle, thumbnail, ...item }
    })

    await this.redisService.set('ssp/hot', data)
    return data
  }

  public async rec(
    payload: {
      limit: number
      offset: number
      created_at: number
    } = { limit: 10, offset: 0, created_at: 0 }
  ) {
    const cache = await this.redisService.get('ssp/rec')
    if (cache) return cache

    const url = `https://sspai.com/api/v1/article/index/page/get`
    const headers = { 'user-agent': genUserAgent('mobile') }
    const response = await this.get<SspPaginationResponse>(
      url,
      payload,
      headers
    )

    const data = response.data.data.map((item) => {
      const subtitle = item.summary
      const thumbnail = item.banner
      return { subtitle, thumbnail, ...item }
    })

    await this.redisService.set('ssp/rec', data)
    return data
  }

  public getSpeciTime(time = '18:18') {
    const today = new Date()
    const [hour, mins] = time.split(':')
    today.setHours(+hour)
    today.setMinutes(+mins)

    return today
  }

  public async get<T>(url: string, params = {}, headers: {} = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          headers,
          params
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw 'An error happened!'
          })
        )
    )
    return response
  }
}
