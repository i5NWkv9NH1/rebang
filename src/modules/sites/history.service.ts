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
export class HistoryService {
  private logger = new Logger(HistoryService.name)

  constructor(
    private redisService: RedisService,
    private httpService: HttpService
  ) {}

  public async start() {
    const cache = await this.redisService.get('history')
    if (cache) return cache

    const url = `https://hao.360.com/histoday`
    const userAgent = genUserAgent('desktop')
    const response = await this.get<string>(url, { 'user-agent': userAgent })
    const $ = cheerio.load(response.data)

    const data = $('.tih-list')
      .find('dl')
      .map((index, el) => {
        const metrics = $(el).find('dt').text().split(' ')
        const title = metrics[metrics.length - 1]
        const thumbnail = $(el).find('img').attr('data-src')
        const subtitle = $(el).find('dd').find('.desc').text().trim()

        return {
          title,
          thumbnail: thumbnail ?? '',
          subtitle
        }
      })
      .toArray()

    await this.redisService.set('history', data)

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
