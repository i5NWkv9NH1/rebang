/**
 * @description 梨视频
 */
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class PearvideoService {
  private logger = new Logger(PearvideoService.name)

  constructor(
    private readonly redisService: RedisService,
    private readonly httpService: HttpService
  ) {}

  public async rank() {
    const cache = await this.redisService.get('pearvideo/rank')
    if (cache) return cache

    const url = `https://www.pearvideo.com/popular`
    const response = await this.get<string>(url)
    const $ = cheerio.load(response.data)
    // const data = $('.popular-list')
    //   .find('.popularem')
    //   .map((index, el) => {
    //     const title = $(el).find('.popularembd').find('h2').text()
    //     const subtitle = $(el).find('.popularembd').find('p').text()
    //     const thumbnail = $(el)
    //       .find('.actplay')
    //       .find('.popularem-img')
    //       .attr('style')
    //     const url = `https://www.pearvideo.com/${$(el)
    //       .find('a')
    //       .first()
    //       .attr('href')}`
    //     const metric = $(el)
    //       .find('.popularem-ath')
    //       .find('.vercont-auto')
    //       .find('span')
    //       .text()
    //     return { title, subtitle, thumbnail, url, metric }
    //   }).toArray
    const data = $('.popular-list li')
      .map((index, el) => {
        return {
          url: 'https://www.pearvideo.com/' + $(el).find('a').attr('href'),
          title: $(el).find('.popularem-ath a h2').text(),
          subtitle: $(el).find('.popularem-ath a p').text(),
          thumbnail: $(el)
            .find('.popularem-img')
            .attr('style')
            .replace('background-image: url(', '')
            .replace(');', ''),
          metrics: $(el)
            .find('.popularem-ath')
            .find('.vercont-auto')
            .find('span')
            .text()
        }
      })
      .toArray()

    await this.redisService.set('pearvideo/rank', data)
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
