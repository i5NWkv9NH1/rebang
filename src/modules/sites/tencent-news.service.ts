import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'
import { genUserAgent } from 'src/helpers'
import { TencentNewsHotResponse } from 'src/types/tencent-news.type'

@Injectable()
export class TencentNewsService {
  private logger = new Logger(TencentNewsService.name)

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  public async hot() {
    const cache = await this.redisService.get('tencent-news/hot')
    if (cache) return cache

    const pageSize = 50
    const url = `https://r.inews.qq.com/gw/event/hot_ranking_list?page_size=${pageSize}`
    const headers = { 'user-agent': genUserAgent('mobile') }
    const respone = await this.get<TencentNewsHotResponse>(url, headers)

    //? filter ad
    const data = respone.data.idlist[0].newslist.filter(
      (item) => item.articletype !== '560'
    )

    await this.redisService.set('tencent-news/hot', data)
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
