import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { AxiosError, AxiosProxyConfig, AxiosRequestConfig } from 'axios'
import * as cheerio from 'cheerio'
import { Redis } from 'ioredis'
import { catchError, firstValueFrom } from 'rxjs'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { RedisService } from 'src/shared/redis.service'
import {
  BiliBiliRankResponse,
  BilibiliHotResponse,
  BilibiliWeekResponse
} from 'src/types'
import { BILIBILI_API } from './bilibili.constant'
import { BiliBiliItem } from './bilibili.type'

@Injectable()
export class BilibiliService {
  private logger = new Logger(BilibiliService.name)

  private headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  //TODO: paginate
  //#region 热门
  //? 各个领域中新奇好玩的优质内容都在这里~
  public async hot() {
    const params = {
      pageNumber: 1,
      pageSize: 20
    }
    const url = BILIBILI_API.HOT
    const response = await this.fetchService.get<BilibiliHotResponse>(url, {
      headers: this.headers,
      params
    })

    const meta = {
      totalSize: response.data.page.count,
      pageNumber: response.data.page.pn,
      pageSize: response.data.page.ps
    }
    const reminder = '各个领域中新奇好玩的优质内容都在这里'
    const items = this.transformItems(response.data.data)
    return {
      reminder,
      meta,
      items
    }
  }
  //#endregion

  //#region 每周必看
  //? 每周五晚 18:00 更新
  public async week() {
    const url = BILIBILI_API.WEEK
    const response = await this.fetchService.get<BilibiliWeekResponse>(url, {
      headers: this.headers
    })
    const items = this.transformItems(response.data.data.list)
    const reminder = response.data.data.reminder
    return {
      reminder,
      items
    }
  }
  //#endregion

  //#region 排行榜
  //? 排行榜根据稿件内容质量，近期的数据综合展示，动态更新
  public async rank() {
    const url = BILIBILI_API.RANK
    const response = await this.fetchService.get<BiliBiliRankResponse>(url, {
      headers: this.headers
    })

    const reminder = response.data.data.note
    const items = this.transformItems(response.data.data.list)

    return {
      reminder,
      items
    }
  }
  //#endregion

  public transformItems(items: any[]): BiliBiliItem[] {
    return items.map((item) => {
      let author: any = {}
      if (item.author) {
        author.id = item.author.mid
        author.name = item.author.name
        author.avatarUrl = item.author.face
        author.url = `https://space.bilibili.com/${item.author.mid}`
      } else {
        author.id = item.owner.mid
        author.name = item.owner.name
        author.avatarUrl = item.owner.face
        author.url = `https://space.bilibili.com/${item.owner.mid}`
      }
      return {
        id: item.aid,
        title: item.title,
        originUrl: 'https://bilibili.com/video/' + item.bvid,
        thumbnailUrl: item.pic || item.thumbnail,
        publishedDate: item.pubdate || item.ctime,
        caption: item.desc || item.hot_desc,
        tag: item.tname,
        duration: item.duration,
        author,
        stats: {
          ...item.stat
        }
      }
    })
  }
}
