import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError, AxiosProxyConfig, AxiosRequestConfig } from 'axios'
import * as cheerio from 'cheerio'
import { Redis } from 'ioredis'
import { catchError, firstValueFrom } from 'rxjs'
import { genUserAgent } from 'src/helpers'
import { RedisService } from 'src/shared/redis.service'
import {
  BiliBiliRankResponse,
  BilibiliHotResponse,
  BilibiliWeekResponse
} from 'src/types'

@Injectable()
export class BiliBiliService {
  private logger = new Logger(BiliBiliService.name)

  //TODO
  private headers: AxiosRequestConfig['headers'] = {}
  private proxy: AxiosRequestConfig['proxy'] = false

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //#region 热门
  //? 各个领域中新奇好玩的优质内容都在这里~
  public async hot(pageNumber: number = 1, pageSize: number = 100) {
    const cache = await this.redisService.get('bilibili/hot')
    if (cache) return cache

    const url = `https://api.bilibili.com/x/web-interface/wx/hot?pn=${pageNumber}&ps=${pageSize}&teenage_mode=0`
    const userAgent = genUserAgent('mobile')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<BilibiliHotResponse>(url, headers)

    const meta = {
      totalSize: response.data.page.count,
      pageNumber: response.data.page.pn,
      pageSize: response.data.page.ps
    }
    const reminder = '各个领域中新奇好玩的优质内容都在这里'
    const data = response.data.data.map((item) => {
      const title = item.title
      const thumbnail = item.pic
      const subtitle = item.desc
      const tag = item.tname
      const author = {
        ...item.author,
        name: item.author.name,
        avatarUrl: item.author.face,
        url: `https://space.bilibili.com/${item.author.mid}`
      }
      const stat = {
        ...item.stat
      }
      return {
        ...item,
        title,
        thumbnail,
        subtitle,
        tag,
        author,
        stat
      }
    })
    await this.redisService.set('bilibili/hot', { reminder, meta, data })
    return {
      reminder,
      meta,
      data
    }
  }
  //#endregion

  //#region 每周必看
  //? 每周五晚 18:00 更新
  public async week() {
    const cache = await this.redisService.get('bilibili/week')
    if (cache) return cache

    const url =
      'https://api.bilibili.com/x/web-interface/popular/series/one?number=242'
    const userAgent = genUserAgent('mobile')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<BilibiliWeekResponse>(url, headers)
    const data = response.data.data.list.map((item) => {
      const title = item.title
      const thumbnail = item.pic
      const subtitle = item.desc
      const tag = item.tname
      const author = {
        ...item.own,
        name: item.owner.name,
        avatarUrl: item.owner.face,
        url: `https://space.bilibili.com/${item.owner.mid}`
      }
      const stat = {
        ...item.stat
      }
      return {
        ...item,
        title,
        thumbnail,
        subtitle,
        tag,
        author,
        stat
      }
    })
    const reminder = response.data.data.reminder
    await this.redisService.set('bilibili/hot', { reminder, data })
    return {
      reminder,
      data
    }
  }
  //#endregion

  //#region 排行榜
  //? 排行榜根据稿件内容质量，近期的数据综合展示，动态更新
  public async rank() {
    const cache = await this.redisService.get('bilibili/rank')
    if (cache) return cache

    const url =
      'https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all'
    const userAgent = genUserAgent('mobile')
    const headers = { 'user-agent': userAgent }
    const response = await this.get<BiliBiliRankResponse>(url, headers)

    const reminder = response.data.data.note
    const data = response.data.data.list.map((item) => {
      const title = item.title
      const thumbnail = item.pic
      const subtitle = item.desc
      const tag = item.tname
      const author = {
        ...item.own,
        name: item.owner.name,
        avatarUrl: item.owner.face,
        url: `https://space.bilibili.com/${item.owner.mid}`
      }
      const stat = {
        ...item.stat
      }
      return {
        ...item,
        title,
        thumbnail,
        subtitle,
        tag,
        author,
        stat
      }
    })

    await this.redisService.set('bilibili/rank', { reminder, data })

    return {
      reminder,
      data
    }
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
            this.logger.error(error)
            throw 'An error happened!'
          })
        )
    )
    return response
  }
}
