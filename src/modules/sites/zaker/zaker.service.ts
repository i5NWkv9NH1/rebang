import { Injectable, Logger } from '@nestjs/common'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import * as cheerio from 'cheerio'
import { ZAKER_API, ZAKER_CACHE_KEY } from './zaker.constant'
import { genUserAgent } from 'src/helpers'
import { OriginZakerHotResponse } from './zaker.type'

@Injectable()
export class ZakerService {
  private readonly logger = new Logger(ZakerService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  public async getNextUrl(url: string = ZAKER_API.WEB_HOT_NEXT_URL) {
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const script = $('script')
      .map((_, item) => $(item).text())
      .toArray()
      .filter((item) => item)
      .filter((item) => item.startsWith('w'))[0]

    const replaceScriptContent = script.replace('window.WinPageData =', '')
    const popScriptContent = replaceScriptContent.substring(
      0,
      replaceScriptContent.length - 1
    )
    const data = JSON.parse(popScriptContent)
    const nextUrl = data['next_url']['value']
    const items = this.transformFields(data['data']['article'])

    return {
      items,
      paginiate: {
        nextUrl
      }
    }
  }

  //#region 热新闻
  public async hot(nextUrl: string = '') {
    let data: any

    if (!nextUrl) {
      const cache = await this.redisService.get(ZAKER_CACHE_KEY.HOT)
      if (cache) return cache
      data = await this.getNextUrl(ZAKER_API.WEB_HOT_NEXT_URL)
      await this.redisService.set(ZAKER_CACHE_KEY.HOT, data)

      return data
    }

    const urlSearch = new URLSearchParams(nextUrl)
    const nextArticleId = urlSearch.get('next_aticle_id') || ''

    const cacheKey = `${ZAKER_CACHE_KEY.HOT}/${nextArticleId}`
    const cache = await this.redisService.get(cacheKey)
    if (cache) return cache

    const response = await this.fetchService.get<OriginZakerHotResponse>(
      nextUrl,
      {
        headers: this.headers
      }
    )
    const items = this.transformFields(response.data.data.article)
    data = {
      items,
      pagniate: {
        nextUrl: response.data.next_url.value
      }
    }

    await this.redisService.set(cacheKey, data)
    return data
  }
  //#endregion

  //#region 独家
  public async onlyone(nextUrl: string = '') {
    let data: any

    if (!nextUrl) {
      const cache = await this.redisService.get(
        ZAKER_CACHE_KEY.WEB_ONLY_ONE_NEXT_URL
      )
      if (cache) return cache
      data = await this.getNextUrl(ZAKER_API.WEB_ONLY_ONE_URL)
      await this.redisService.set(ZAKER_CACHE_KEY.WEB_ONLY_ONE_NEXT_URL, data)

      return data
    }

    const urlSearch = new URLSearchParams(nextUrl)
    const nextArticleId = urlSearch.get('next_aticle_id') || ''

    const cacheKey = `${ZAKER_CACHE_KEY.WEB_ONLY_ONE_NEXT_URL}/${nextArticleId}`
    const cache = await this.redisService.get(cacheKey)
    if (cache) return cache

    const response = await this.fetchService.get<OriginZakerHotResponse>(
      nextUrl,
      {
        headers: this.headers
      }
    )
    const items = this.transformFields(response.data.data.article)
    data = {
      items,
      pagniate: {
        nextUrl: response.data.next_url.value
      }
    }

    await this.redisService.set(cacheKey, data)
    return data
  }
  //#endregion

  public transformFields(items: any[]) {
    return items.map((item) => {
      const title = item.title
      const caption = item.desc
      //TODO: transform to timestamp
      const publishedDate = item.date
      const originUrl = item.url
      const thumbnailUrl = item.thumbnail_mpic
      const author = {
        name: item.auther_name
      }
      const stats = {
        comment: item.comment_counts,
        tag: item.tag.map((item) => ({ name: item.tag, url: item.url }))
      }

      return {
        title,
        caption,
        originUrl,
        publishedDate,
        thumbnailUrl,
        author,
        stats
      }
    })
  }
}
