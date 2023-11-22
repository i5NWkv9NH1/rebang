/**
 * @description 搜狗热搜
 */
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { genUserAgent } from 'src/helpers'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class SogouService {
  private logger = new Logger(SogouService.name)

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  public async start() {
    const cache = await this.redisService.get('sogou')
    if (cache) return cache

    const url = `https://go.ie.sogou.com/hot_ranks`
    const userAgent = genUserAgent('desktop')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<{ data: any[] }>(url, headers)

    const data = response.data.data.map((item) => {
      return {
        url: 'https://www.sogou.com/web?ie=utf8&query=' + item.attributes.title,
        title: item.attributes.title,
        metrics: [item.attributes.flag, item.attributes.num]
      }
    })

    await this.redisService.set('sogou', data)
    return data
  }

  public async get<T>(url: string, headers: {} = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          headers
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
