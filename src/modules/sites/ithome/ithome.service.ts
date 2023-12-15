import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import * as cheerio from 'cheerio'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser, BrowserContextOptions } from 'playwright'
import { genUserAgent, removeHtmlTag } from 'src/helpers'
import { RedisService } from 'src/shared/redis.service'
import { ITHOME_API, ITHOME_CACHE_KEY, ITHOME_TABS } from './ihome.constant'
import { FetchService } from 'src/shared/fetch.service'
import { HttpStatusCode } from 'axios'
import {
  OriginITHomeHotItem,
  OriginITHomeHotResponse,
  OriginITHomeHotType,
  OriginITHomeMenusResponse,
  OriginITHomeNewsItem
} from './ithome.type'

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

  //#region API
  public async menus() {
    const cache = await this.redisService.get(ITHOME_CACHE_KEY.MENUS)
    if (cache) return cache

    const payload = {
      brand: 'apple',
      displayList: [],
      unDisplayList: []
    }
    const response = await this.fetchService.post<OriginITHomeMenusResponse>(
      ITHOME_API.MENUS,
      payload,
      { headers: this.headers }
    )
    const items = response.data.data.showTopMenus

    await this.redisService.set(ITHOME_CACHE_KEY.MENUS, items)

    return items
  }

  public async hot(type: OriginITHomeHotType = OriginITHomeHotType.READ) {
    const cache = await this.redisService.get(`${ITHOME_CACHE_KEY.HOT}/${type}`)
    if (cache) return cache

    const response = await this.fetchService.get<OriginITHomeHotResponse>(
      `${ITHOME_API.HOT}/${type}`,
      { headers: this.headers }
    )
    // const dayIndex = response.data.data.list.findIndex(
    //   (item) => item.feedContent.text === '日榜'
    // )
    // const weekIndex = response.data.data.list.findIndex(
    //   (item) => item.feedContent.text === '周榜'
    // )
    // const monthIndex = response.data.data.list.findIndex(
    //   (item) => item.feedContent.text === '月榜'
    // )
    // const dayList = response.data.data.list.slice(dayIndex + 1, weekIndex - 1)
    // const weekList = response.data.data.list.slice(
    //   weekIndex + 1,
    //   monthIndex - 1
    // )
    // const monthList = response.data.data.list.slice(
    //   monthIndex + 1,
    //   response.data.data.list.length
    // )

    const pagniate = {
      hasMore: response.data.data.hasMore
    }

    // const items = {
    //   day: dayList,
    //   week: weekList,
    //   month: monthList
    // }
    const items = response.data.data.list
      .filter((item) => item.feedType === 10011 || item.feedType === 10015)
      .map((item) => item.feedContent)
      .map((item) => {
        if (item.text) {
          return { divider: item.text }
        }
        const rank = item.rank
        return this.transformField({ rank, ...item.newsData })
      })

    const data = { items, pagniate }
    await this.redisService.set(`${ITHOME_CACHE_KEY.HOT}/${type}`, data)
    return data
  }
  //#endregion

  public transformField(item: OriginITHomeNewsItem) {
    const id = item.id
    const rank = item.rank
    const originUrl = item.shareUrl
    const title = item.title
    const caption = removeHtmlTag(item.content)
    const publishedDate = item.postDate
    const thumbnailUrl = item.images[0] || ''
    const stats = {
      tags: item.tags.map((item) => item.keyword),
      comment: item.commentCount
    }
    // prettier-ignore
    return { id, rank, originUrl,thumbnailUrl, title, caption, publishedDate, stats }
  }

  public transformFieldsByArr(items: OriginITHomeNewsItem[]) {
    return items.map((item) => {
      const id = item.id
      const rank = item.rank
      const originUrl = item.shareUrl
      const title = item.title
      const caption = removeHtmlTag(item.content)
      const publishedDate = item.postDate
      const stats = {
        tags: item.tags.map((item) => item.keyword),
        comment: item.commentCount
      }
      return { id, rank, originUrl, title, caption, publishedDate, stats }
    })
  }

  //#region web cralwer
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
  //#endregion
}
