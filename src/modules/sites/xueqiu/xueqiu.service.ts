import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent, removeHtmlTag } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import { XUEQIU_API, XUEQIU_CACHE_KEY } from './xueqiu.constant'
import { parseCookie } from 'src/helpers/cookie'
import { OriginXueqiuHotStockResponse } from './xueqiu.type'

//TODO: Paginate
//TODO: Query
//TODO: Response data
@Injectable()
export class XueqiuService {
  private readonly logger = new Logger(XueqiuService.name)
  private readonly headers = {
    Origin: 'https://xueqiu.com',
    Referer: 'https://xueqiu.com/today',
    'User-Agent': genUserAgent('desktop'),
    'X-Requested-With': 'XMLHttpRequest'
  }
  private readonly baseUrl = 'https://xueqiu.com'

  constructor(
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  //#region cookie
  public async getCookie() {
    const cache = await this.redisService.get(XUEQIU_CACHE_KEY.COOKIE)
    if (cache) return cache

    const response = await this.fetchService.get<string>(this.baseUrl, {
      headers: this.headers
    })
    const cookies = response.headers['set-cookie'] as string[]

    await this.redisService.set(XUEQIU_CACHE_KEY.COOKIE, cookies)

    return cookies
  }
  //#endregion

  //#region 热门股
  public async hotStock() {
    const cookie = parseCookie(await this.getCookie())
    const url = XUEQIU_API.HOT_STOCK
    const params = {
      size: 8,
      type: 10,
      _type: 10
    }
    const response = await this.fetchService.get<OriginXueqiuHotStockResponse>(
      url,
      { headers: { ...this.headers, Cookie: cookie }, params }
    )
    const items = response.data.data.items
    return items
  }
  //#endregion

  //#region 公告
  public async notice() {
    const cookie = parseCookie(await this.getCookie())
    const url = XUEQIU_API.NOTICE

    const params = {
      count: 1,
      page: 10,
      scope: 'day',
      type: 'notice'
    }
    const headers = {}

    const response = await this.fetchService.get<any>(url, {
      headers: { ...this.headers, Cookie: cookie, Host: 'xueqiu.com' },
      params
    })

    const items = response.data.data.map((item) => {
      return {
        ...item,
        id: item.id,
        url: item.target,
        title: removeHtmlTag(item.text),
        subtitle: item.description,
        date: item.created_at
      }
    })

    return items
  }
  //#endregion

  //#region 新闻
  public async news() {
    const cookie = parseCookie(await this.getCookie())
    const url = XUEQIU_API.NEWS
    const params = {
      count: 1,
      page: 10,
      scope: 'day',
      type: 'news'
    }
    const response = await this.fetchService.get<any>(url, {
      headers: { ...this.headers, Cookie: cookie, Host: 'xueqiu.com' },
      params
    })

    const items = response.data.data.map((item) => {
      return {
        ...item,
        id: item.id,
        url: item.target,
        title: removeHtmlTag(item.text),
        subtitle: item.description,
        date: item.created_at
      }
    })

    return items
  }
  //#endregion

  //#region 7x24
  public async livenews() {
    const params = {
      sinceId: -1,
      maxId: -1,
      count: 10
    }

    const cookie = parseCookie(await this.getCookie())
    const url = XUEQIU_API.DAY
    const response = await this.fetchService.get<any>(url, {
      headers: { ...this.headers, Cookie: cookie, Host: 'xueqiu.com' },
      params
    })

    const items = response.data.items.map((item) => {
      return {
        ...item,
        id: item.id,
        url: item.target,
        title: item.text,
        date: item.created_at
      }
    })

    return items
  }
  //#endregion
}
