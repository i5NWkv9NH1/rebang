import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import * as cheerio from 'cheerio'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser, BrowserContextOptions } from 'playwright'
import { genUserAgent } from 'src/helpers'
import { RedisService } from 'src/shared/redis.service'
import { ITHOME_CACHE_KEY, ITHOME_TABS } from './ihome.constant'
import { FetchService } from 'src/shared/fetch.service'
import { HttpStatusCode } from 'axios'

//TODO: fix
@Injectable()
export class ITHomeService {
  private readonly url: string = 'https://m.ithome.com/rankm'
  private readonly ctxOptions: BrowserContextOptions = {
    userAgent: genUserAgent('mobile')
  }
  private readonly headers = {
    'User-Agent': genUserAgent('mobile')
  }
  private readonly logger = new Logger(ITHomeService.name)

  public data = {
    hot: {},
    day: {},
    weeK: {},
    month: {}
  }

  constructor(
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  public async findByTab(tab: ITHOME_TABS) {
    switch (tab) {
      case ITHOME_TABS.DAY:
        return await this.redisService.get(ITHOME_CACHE_KEY.DAY)
      case ITHOME_TABS.WEEK:
        return await this.redisService.get(ITHOME_CACHE_KEY.WEEK)
      case ITHOME_TABS.HOT:
        return await this.redisService.get(ITHOME_CACHE_KEY.HOT)
      case ITHOME_TABS.MONTH:
        return await this.redisService.get(ITHOME_CACHE_KEY.MONTH)
      default:
        throw new HttpException('Tab must be found', HttpStatusCode.BadRequest)
    }
  }

  public async bootstrap() {
    const cache = await this.redisService.get(ITHOME_CACHE_KEY.BOOTSTRAP)
    if (cache) return cache

    const response = await this.fetchService.get<string>(this.url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    await Promise.all(
      $('.rank-box')
        .map(async (index, rank) => {
          const items = this.crawler($, rank)
          switch (index) {
            case 0:
              this.data.day = items
              await this.redisService.set(ITHOME_CACHE_KEY.DAY, items)
              break
            case 1:
              this.data.weeK = items
              await this.redisService.set(ITHOME_CACHE_KEY.WEEK, items)
              break
            case 2:
              this.data.hot = items
              await this.redisService.set(ITHOME_CACHE_KEY.HOT, items)
              break
            case 3:
              this.data.month = items
              await this.redisService.set(ITHOME_CACHE_KEY.MONTH, items)
              break
            default:
              break
          }
          return items
        })
        .toArray()
    )

    await this.redisService.set(ITHOME_CACHE_KEY.BOOTSTRAP, this.data)

    return this.data
  }

  public crawler($: cheerio.CheerioAPI, el: cheerio.Element) {
    const items = $(el)
      .find('div a')
      .map(async (index, a) => {
        const url = $(a).attr('href')
        const originUrl = this.transformPCUrl(url)
        const title = $(a).find('.plc-title').text()
        const thumbnail = $(a).find('.plc-image img').attr('src')
        const time = $(a).find('.post-time').text()
        const comments = $(a).find('.review-num').text()
        //TODO: add subpage title get
        // const response = await this.getHtml(url)
        // const $$ = cheerio.load(response.data)
        // const subtitle = $$('p').text()
        // return { url, originUrl, title, thumbnail, time, comments, subtitle }
        return { url, originUrl, title, thumbnail, time, comments }
      })
      .toArray()
    return items
  }

  public transformPCUrl(url: string) {
    const regex = /\d+/g
    const id = url.match(regex)[0]

    const pathOne = id.slice(0, 3)
    const pathTwo = id.slice(3, id.length)

    return `https://www.ithome.com/0/${pathOne}/${pathTwo}.htm`
  }
}
