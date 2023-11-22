import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class KrService {
  private logger = new Logger(KrService.name)

  private tags: [
    //? 48小时热榜
    { path: '/rank'; name: '热榜' },
    //? 最新
    { path: '/latest'; name: '资讯' },
    //? 一整天
    { path: '/today'; name: '快讯' }
  ]

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //#region 48小时热榜
  //? 每5分钟更新
  public async rank(date: string = Date(), pageNumber: number = 1) {
    // const url = `https://36kr.com/hot-list/renqi/${date}/${pageNumber}`
  }
  //#endregion

  //#region 最新资讯
  public async latest() {}
  //#endregion

  //#region 一整天快讯
  public async today() {}

  public async get<T>(url: string, headers: {} = {}, params = {}) {
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
