import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'
import { genUserAgent } from 'src/helpers'

@Injectable()
export class ShadiaoNewsService {
  private logger = new Logger(ShadiaoNewsService.name)

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  public async start(currentPage: number = 0) {
    const cache = await this.redisService.get(`shadiaonews/${currentPage}`)
    if (cache) return cache

    const url = `https://shadiao.plus/page/${currentPage}`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const response = await this.get<string>(url, headers)
    const $ = cheerio.load(response.data)

    const data = $('#grid-wrapper')
      .find('article')
      .toArray()
      .slice(1)
      .map((el, index) => {
        const url = $(el).find('.post-thumbnail').find('a').attr('href')
        const thumbnail = $(el)
          .find('.post-thumbnail')
          .find('img')
          .attr('data-src')
        const title = $(el)
          .find('.post-content')
          .find('.post-title')
          .text()
          .trim()
        const subtitle = $(el)
          .find('.post-content')
          .find('.entry-summary')
          .text()
          .trim()
        const date = $(el)
          .find('.post-content')
          .find('.post-date')
          .text()
          .trim()
        const category = $(el)
          .find('.post-content')
          .find('.post-category')
          .text()
          .trim()
        return { url, thumbnail, title, subtitle, date, category }
      })

    await this.redisService.set(`shadiaonews/${currentPage}`, data)
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
