import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { genUserAgent } from 'src/helpers'
import { RedisService } from 'src/shared/redis.service'
import * as cheerio from 'cheerio'

@Injectable()
export class BaiduService {
  private logger = new Logger(BaiduService.name)

  //TODO
  private headers: AxiosRequestConfig['headers'] = {}
  private proxy: AxiosRequestConfig['proxy'] = false

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //#region 热搜
  public async hot() {
    const cache = await this.redisService.get('baidu/hot')
    if (cache) return cache

    const url = `https://top.baidu.com/board?tab=realtime`
    const userAgent = genUserAgent('desktop')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<string>(url, headers)
    const data = await this.crawler(response.data)

    await this.redisService.set('baidu/hot', data)
    return data
  }
  //#endregion

  //#region 小说
  public async novel() {
    const cache = await this.redisService.get('baidu/novel')
    if (cache) return cache
    const url = `https://top.baidu.com/board?tab=novel`
    const userAgent = genUserAgent('desktop')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<string>(url, headers)
    const data = await this.crawler(response.data)

    await this.redisService.set('baidu/novel', data)
    return data
  }
  //#endregion

  //#region 电影
  public async movie() {
    const cache = await this.redisService.get('baidu/movie')
    if (cache) return cache
    const url = `https://top.baidu.com/board?tab=movie`
    const userAgent = genUserAgent('desktop')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<string>(url, headers)
    const data = await this.crawler(response.data)

    await this.redisService.set('baidu/movie', data)
    return data
  }
  //#endregion

  //#region 电视剧
  public async teleplay() {
    const cache = await this.redisService.get('baidu/teleplay')
    if (cache) return cache
    const url = `https://top.baidu.com/board?tab=teleplay`
    const userAgent = genUserAgent('desktop')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<string>(url, headers)
    const data = await this.crawler(response.data)

    await this.redisService.set('baidu/teleplay', data)
    return data
  }
  //#endregion

  //#region 汽车
  public async car() {
    const cache = await this.redisService.get('baidu/car')
    if (cache) return cache
    const url = `https://top.baidu.com/board?tab=car`
    const userAgent = genUserAgent('desktop')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<string>(url, headers)
    const data = await this.crawler(response.data)

    await this.redisService.set('baidu/car', data)
    return data
  }
  //#endregion

  //#region 游戏
  public async game() {
    const cache = await this.redisService.get('baidu/game')
    if (cache) return cache
    const url = `https://top.baidu.com/board?tab=game`
    const userAgent = genUserAgent('desktop')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<string>(url, headers)
    const data = await this.crawler(response.data)

    await this.redisService.set('baidu/game', data)
    return data
  }
  //#endregion

  //#region 爬虫逻辑
  public async crawler(data: string) {
    const $ = cheerio.load(data)
    return $('.category-wrap_iQLoo')
      .map((index, item) => {
        //? 热门标签 与 title 在同一个div内
        const title = $(item)
          .find('.content_1YWBm .title_dIF3B div')
          .first()
          .text()
          .trim()
        //? 热搜页和其他页不同 class
        let subtitle: string = ''
        const subTitle1 = $(item)
          .find('.content_1YWBm .desc_3CTjT')
          .text()
          .trim()
        const subTitle2 = $(item)
          .find('.content_1YWBm .hot-desc_1m_jR')
          .text()
          .trim()
        // TODO: remove 查看更多
        subtitle = subTitle1 || subTitle2
        subtitle = subtitle
          .replace('查看更多', '')
          .replace(/\>/, '')
          .replaceAll('.', '')
          .trim()
        console.log(subtitle)

        const metrics = [
          $(item).find('.trend_2RttY .hot-index_1Bl1a').text().trim()
        ]
        $(item)
          .find('.content_1YWBm .intro_1l0wp')
          .each((_, el) => {
            metrics.push($(el).text())
          })
        let isHot: boolean = false

        const hotEl = $(item)
          .find('.content_1YWBm .title_dIF3B .hot-tag_1G080')
          .text()
          .trim()
        if (hotEl) isHot = true

        const url = $(item).find('a').attr('href')
        //? 有两个img，第一个img为图标
        const thumbnail = $(item)
          .find('.img-wrapper_29V76 img')
          .last()
          .attr('src')
        return { url, title, subtitle, thumbnail, metrics, isHot }
      })
      .toArray()
  }
  //#endregion

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
