import { HttpService } from '@nestjs/axios'
import { HttpCode, HttpException, Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError, HttpStatusCode } from 'axios'
import { RedisService } from 'src/shared/redis.service'
import { genUserAgent, removeHtmlTag } from 'src/helpers'
import {
  XueqiuHotStockRequestPayload,
  XueqiuHotRequestPayload,
  XueqiuHotResponse,
  XueqiuLivenewsRequestPayload,
  XueqiuLivenewsResponse,
  XueqiuHotStockResponse
} from 'src/types/'

//TODO: pagination
//TODO: refresh cookie
@Injectable()
export class XueqiuService {
  private logger = new Logger(XueqiuService.name)
  private userAgent: string = genUserAgent('desktop')
  private baseUrl: string = 'https://xueqiu.com/'
  private cookie: string

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //TODO: use axios
  public async getCookie() {
    const ctx = await this.browser.newContext({
      userAgent: this.userAgent
    })
    const page = await ctx.newPage()
    await page.goto(this.baseUrl)
    await page.screenshot({
      path: 'screenshots/xueqiu.png'
    })
    const cookie = await ctx.cookies()

    await page.close()
    await ctx.close()
    await this.redisService.set('xueqiu/cookie', cookie)
    return cookie
  }

  //#region 热门股
  public async hotStock(
    payload: XueqiuHotStockRequestPayload = {
      size: 8,
      type: 10,
      _type: 10
    }
  ) {
    const cache = await this.redisService.get(`xueqiu/hotstock/${payload.type}`)
    if (cache) return cache

    const cookie = (await this.redisService.get('xueqiu/cookie')) as any[]
    const parseCookie = cookie
      .map((item) => `${item.name}=${item.value}`)
      .toString()
      .replaceAll(',', ';')

    const url = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=${payload.size}&type=${payload.type}&_type=${payload._type}`

    const headers = {
      Cookie: parseCookie,
      Origin: 'https://xueqiu.com',
      Referer: 'https://xueqiu.com/today',
      // Host: 'xueqiu.com',
      'User-Agent': this.userAgent,
      'X-Requested-With': 'XMLHttpRequest'
    }

    const response = await this.get<XueqiuHotStockResponse>(url, {}, headers)

    const data = response.data.data.items

    await this.redisService.set(`xueqiu/hotstock/${payload.type}`, data)
    return data
  }
  //#endregion

  //#region 公告
  public async notice(
    payload: XueqiuHotRequestPayload = {
      currentPage: 1,
      pageSize: 10,
      scope: 'day',
      type: 'notice'
    }
  ) {
    const cache = await this.redisService.get('xueqiu/notices')
    if (cache) return cache

    const cookie = (await this.redisService.get('xueqiu/cookie')) as any[]
    const parseCookie = cookie
      .map((item) => `${item.name}=${item.value}`)
      .toString()
      .replaceAll(',', ';')

    const rewritePayload = {
      count: payload.pageSize,
      page: payload.currentPage,
      scope: payload.scope,
      type: payload.type
    }
    const url = `https://xueqiu.com/query/v1/status/hots.json`
    const headers = {
      Cookie: parseCookie,
      Referer: 'https://xueqiu.com/today',
      Origin: 'https://xueqiu.com',
      Host: 'xueqiu.com',
      'User-Agent': this.userAgent,
      'X-Requested-With': 'XMLHttpRequest'
    }

    const response = await this.get<XueqiuHotResponse>(
      url,
      rewritePayload,
      headers
    )

    const data = response.data.data.map((item) => {
      return {
        ...item,
        id: item.id,
        url: item.target,
        title: removeHtmlTag(item.text),
        subtitle: item.description,
        date: item.created_at
      }
    })

    await this.redisService.set('xueqiu/notices', data)
    return data
  }
  //#endregion

  //#region 新闻
  public async news(
    payload: XueqiuHotRequestPayload = {
      currentPage: 1,
      pageSize: 10,
      scope: 'day',
      type: 'news'
    }
  ) {
    const cache = await this.redisService.get('xueqiu/news')
    if (cache) return cache

    const cookie = (await this.redisService.get('xueqiu/cookie')) as any[]
    const parseCookie = cookie
      .map((item) => `${item.name}=${item.value}`)
      .toString()
      .replaceAll(',', ';')

    const rewritePayload = {
      count: payload.pageSize,
      page: payload.currentPage,
      scope: payload.scope,
      type: payload.type
    }
    const url = `https://xueqiu.com/query/v1/status/hots.json`
    const headers = {
      Cookie: parseCookie,
      Referer: 'https://xueqiu.com/today',
      Origin: 'https://xueqiu.com',
      Host: 'xueqiu.com',
      'User-Agent': this.userAgent,
      'X-Requested-With': 'XMLHttpRequest'
    }

    const response = await this.get<XueqiuHotResponse>(
      url,
      rewritePayload,
      headers
    )

    const data = response.data.data.map((item) => {
      return {
        ...item,
        id: item.id,
        url: item.target,
        title: removeHtmlTag(item.text),
        subtitle: item.description,
        date: item.created_at
      }
    })

    await this.redisService.set('xueqiu/news', data)
    return data
  }
  //#endregion

  //#region 7x24
  public async livenews(
    payload: XueqiuLivenewsRequestPayload = {
      sinceId: -1,
      maxId: -1,
      pageSize: 10
    }
  ) {
    const cache = await this.redisService.get('xueqiu/livenews')
    if (cache) return cache

    const cookie = (await this.redisService.get('xueqiu/cookie')) as any[]
    const parseCookie = cookie
      .map((item) => `${item.name}=${item.value}`)
      .toString()
      .replaceAll(',', ';')
    const rewritePayload = {
      since_id: payload.sinceId,
      max_id: payload.maxId,
      count: payload.pageSize
    }
    const url = `https://xueqiu.com/statuses/livenews/list.json`
    const headers = {
      Cookie: parseCookie,
      Referer: 'https://xueqiu.com/today',
      Origin: 'https://xueqiu.com',
      Host: 'xueqiu.com',
      'User-Agent': this.userAgent,
      'X-Requested-With': 'XMLHttpRequest'
    }

    const response = await this.get<XueqiuLivenewsResponse>(
      url,
      rewritePayload,
      headers
    )

    const data = response.data.items.map((item) => {
      return {
        ...item,
        id: item.id,
        url: item.target,
        title: item.text,
        date: item.created_at
      }
    })

    await this.redisService.set('xueqiu/livenews', data)
    return data
  }
  //#endregion

  public async get<T>(url: string, params: {} = {}, headers: {} = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .get<T>(url, {
          params,
          headers
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw new HttpException(error, HttpStatusCode.BadRequest)
          })
        )
    )
    return response
  }
}
