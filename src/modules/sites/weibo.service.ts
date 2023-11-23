import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class WeiboService {
  public url: string = 'https://s.weibo.com/top/summary?cate'
  public delay: number = 5 * 60 * 1000
  public headers = {
    scheme: 'https',
    cookie:
      'SUB=_2AkMWJrkXf8NxqwJRmP8SxWjnaY12zwnEieKgekjMJRMxHRl-yj9jqmtbtRB6PaaX-IGp-AjmO6k5cS-OH2X9CayaTzVD',
    accept: '*',
    'accept-language': 'zh-CN, zh',
    'user-agent': `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36`
  }
  private readonly logger = new Logger(WeiboService.name)
  private tags: string[] = ['热搜', '文娱', '要闻']

  constructor(
    private readonly redisService: RedisService,
    private readonly httpService: HttpService
  ) {}

  //#region  热搜
  public async realtimehot() {
    const cache = await this.redisService.get('weibo/realtimehot')
    if (cache) return cache

    const response = await this.getHtml(`${this.url}=realtimehot`)
    const $ = cheerio.load(response.data)
    const items = $('.list_a').find('li a')
    const data = await Promise.all(
      items
        .map(async (_, item) => {
          const url = 'https://s.weibo.com' + $(item).attr('href')
          if (!url.includes('?q')) return
          const sort = $(item).find('.hot').text()

          const title = $(item)
            .find('span')
            .first()
            .contents()
            .filter(function () {
              return this.type === 'text'
            })
            .text()
            .trim()

          const metric = $(item).find('span em').text()
          const tag = $(item).find('i').attr('class')
          return {
            sort,
            url,
            title,
            tag,
            metric
          }
        })
        .toArray()
    )

    await this.redisService.set('weibo/realtimehot', data)
    return data
  }
  //#endregion

  //#region  要闻 新时代
  public async socialevent() {
    const cache = await this.redisService.get('weibo/socialevent')
    if (cache) return cache

    const response = await this.getHtml(`${this.url}=socialevent`)
    const $ = cheerio.load(response.data)
    const items = $('.list_b').find('li a')
    const data = await Promise.all(
      items
        .map(async (_, item) => {
          const thumbnail = $(item).find('div img').attr('src')
          const url = 'https://s.weibo.com' + $(item).attr('href')
          const body = $(item).find('article')
          const title = $(body).find('h2').text().replace('#', '')
          const subtitle = $(body).find('p').text()
          const metrics = $(body).find('span').text().split(' ')
          const tag = $(item).find('i').attr('class')
          return {
            url,
            thumbnail,
            title,
            subtitle,
            tag,
            metrics
          }
        })
        .toArray()
    )

    await this.redisService.set('weibo/socialevent', data)
    return data
  }
  //#endregion

  //#region 文娱
  public async entrank() {
    const cache = await this.redisService.get('weibo/entrank')
    if (cache) return cache

    const response = await this.getHtml(`${this.url}=entrank`, {
      'user-agent': ''
    })
    const $ = cheerio.load(response.data)
    const items = $('table tr')
    const data = await Promise.all(
      $(items)
        .map((_, tr) => {
          const sort = $(tr).find('.td-01').text()
          const title = $(tr).find('.td-02 a').text()
          const metrics = [
            $(tr).find('.td-02 span').text(),
            $(tr).find('.td-03 i').text()
          ].filter((item) => item)
          const emoji = $(tr).find('.td-02 img').attr('alt')
          return {
            sort,
            title,
            metrics,
            emoji
          }
        })
        .toArray()
        .filter((item) => item.title)
    )

    await this.redisService.set('weibo/entrank', data)
    return data
  }
  //#endregion

  //#region  话题
  public async topicband() {
    const cache = await this.redisService.get('weibo/topicband')
    if (cache) return cache

    const response = await this.getHtml(`${this.url}=topicband`)
    const $ = cheerio.load(response.data)
    const items = $('.list_b').find('li a')
    const data = await Promise.all(
      items
        .map(async (_, item) => {
          const thumbnail = $(item).find('div img').attr('src')
          const url = $(item).attr('href')
          const body = $(item).find('article')
          const title = $(body).find('h2').text().replace('#', '')
          const subtitle = $(body).find('p').text()
          const metrics = $(body).find('span').text().split(' ')
          const tag = $(item).find('i').attr('class')
          return {
            url,
            thumbnail,
            title,
            subtitle,
            tag,
            metrics
          }
        })
        .toArray()
    )

    await this.redisService.set('weibo/topicband', data)
    return data
  }
  //#endregion

  public async getHtml(url: string, headers?: {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<string>(url, {
          headers: {
            ...this.headers,
            ...headers
          }
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

  public transformUrl(url: string) {
    return `https://s.weibo.com${url}`
  }
}
