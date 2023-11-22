import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { genUserAgent } from 'src/helpers'
import { stringify } from 'querystring'
import { HuxiuLatestResponse } from 'src/types'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class HuxiuService {
  private logger = new Logger(HuxiuService.name)

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //#region 最新
  public async latest() {
    const cache = await this.redisService.get('huxiu/latest')
    if (cache) return cache

    const url = `https://api-article.huxiu.com/web/article/articleList`
    const userAgent = genUserAgent('desktop')
    const headers = {
      'Content-Type:': 'application/x-www-form-urlencoded',
      Cookie: 'huxiu_analyzer_wcy_id=3btsain8t112hhq4jy',
      'User-Agent': userAgent
    }
    const currentTimestamp = Math.ceil(new Date().getTime() / 1000)
    const pageSize = 22

    const payload = {
      platform: 'ww',
      recommend_time: currentTimestamp,
      pagesize: pageSize
    }

    const response = this.httpService.post<HuxiuLatestResponse>(
      url,
      stringify(payload),
      { headers }
    )

    this.logger.log(response)
    return response
  }
  //#endregion

  //#region 热吻
  public async hot() {
    return {}
  }
  //#endregion

  //#region 号外
  public async event() {
    return {}
  }
  //#endregion

  public async post<T>(url: string, data: any, config: AxiosRequestConfig) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService.post<T>(url, data, config).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data)
          throw 'An error happened!'
        })
      )
    )
    return response
  }

  public async get<T>(url: string, config: AxiosRequestConfig) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService.post<T>(url, config).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data)
          throw 'An error happened!'
        })
      )
    )
    return response
  }
}
