import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { genUserAgent } from 'src/helpers'
import { RedisService } from 'src/shared/redis.service'
import { _360Item } from 'src/types'

@Injectable()
export class _360Service {
  private logger = new Logger(_360Service.name)

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  public async rank(pageSize: number = 50) {
    const cache = await this.redisService.get('360/rank')
    if (cache) return cache

    const url = `https://ranks.hao.360.com/mbsug-api/hotnewsquery?type=news&realhot_limit=${pageSize}&src=hao_ranklist_so`
    const userAgent = genUserAgent('mobile')
    const response = await this.get<_360Item[]>(url, {
      'user-agent': userAgent
    })

    const data = response.data.map((item) => {
      return {
        ...item,
        url: item.url,
        title: item.title,
        subtitle: item.sumtxt,
        thumbnail: item.newscard_imgurl,
        metrics: [item.score]
      }
    })

    await this.redisService.set('360/rank', data)
    return data
  }

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
