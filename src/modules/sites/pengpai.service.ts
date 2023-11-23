import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { RedisService } from 'src/shared/redis.service'
import { genUserAgent } from 'src/helpers'
import {
  Item,
  PengpaiChannelRequestPayload,
  PengpaiChannelResponse,
  PengpaiContentRequestPayload,
  PengpaiContentResponse,
  PengpaiHotRespones,
  PengpaiNodeRequestPayload,
  PengpaiNodeResponse
} from 'src/types/pengpai.type'

//TODO
/**
 * @description 澎湃新闻
 */
@Injectable()
export class PengpaiService {
  private logger = new Logger(PengpaiService.name)

  public channels = [
    { name: '要闻', channelId: '' },
    { name: '时事', channelId: '25950' },
    { name: '国际', channelId: '122908' },
    { name: '财经', channelId: '25951' },
    { name: '科技', channelId: '119908' },
    { name: '要闻', channelId: '36079' },
    { name: '智库', channelId: '119489' },
    { name: '生活', channelId: '25953' },
    { name: '思想', channelId: '25952' }
  ]

  public nodes = [
    { name: '中国政库', nodeId: '25462' },
    { name: '中南海', nodeId: '25488' }
  ]

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //? 热榜为单独的接口
  //#region 热榜
  public async hot() {
    const cache = await this.redisService.get('pengpai/hot')
    if (cache) return cache

    const url = `https://cache.thepaper.cn/contentapi/contVisit/hotNews`
    const userAgent = genUserAgent('desktop')
    const response = await this.get<PengpaiHotRespones>(url, {
      'user-agent': userAgent
    })

    const data = this.transformData(response.data.data)

    await this.redisService.set('pengpai/hot', data)

    return data
  }
  //#endregion

  //#region 频道 - 首页要闻
  public async event(
    payload: PengpaiChannelRequestPayload = {
      channelId: '',
      startTime: new Date().getTime(),
      pageNum: 1,
      pageSize: 10,
      excludeContIds: [],
      listRecommendIds: []
    }
  ) {
    const data = await this.getByChannelId(payload)
    return data
  }
  //#endregion

  //#region 节点 - 时事频道 - 中国政库
  public async chinaZhengku(
    payload: PengpaiNodeRequestPayload = {
      nodeId: '25462',
      startTime: new Date().getTime(),
      pageNum: 1,
      pageSize: 10,
      excludeContIds: [],
      listRecommendIds: []
    }
  ) {
    const data = await this.getByNodeIdPortal(payload)
    return data
  }
  //#endregion

  //#region 澎湃号内容
  //? 36079 澎湃号 - 湃客
  public async content(
    payload: PengpaiContentRequestPayload = {
      channelId: '36079',
      startTime: new Date().getTime(),
      pageNum: 1,
      pageSize: 10,
      excludeContIds: [],
      noImgRecommend: true,
      waterfallSpecialIndex: 1,
      province: '',
      contCount: 10,
      listRecommendIds: []
    }
  ) {
    const url = `https://api.thepaper.cn/contentapi/channel/wapPphList`
    const userAgent = genUserAgent('mobile')

    const response = await this.post<PengpaiContentResponse>(url, payload, {
      'user-agent': userAgent
    })
    return response.data.data.list
  }
  //#endregion

  //#region 获取节点文章
  //? nodeId=25462 默认为时事频道的中国智库
  public async getByNodeIdPortal(
    payload: PengpaiNodeRequestPayload = {
      nodeId: '25462',
      startTime: new Date().getTime(),
      pageNum: 1,
      pageSize: 10,
      excludeContIds: [],
      listRecommendIds: []
    }
  ) {
    const cache = await this.redisService.get(`pengpai/${payload.nodeId}`)
    if (cache) return cache

    const url = `https://api.thepaper.cn/contentapi/nodeCont/getByNodeIdPortal`
    const userAgent = genUserAgent('desktop')

    const response = await this.post<PengpaiNodeResponse>(url, payload, {
      'user-agent': userAgent
    })

    const data = this.transformData(response.data.data.list)

    await this.redisService.set(`pengpai/${payload.nodeId}`, data)

    return data
  }
  //#endregion

  //#region 获取频道文章
  //? channel id 为空，默认为首页要闻
  public async getByChannelId(
    payload: PengpaiChannelRequestPayload = {
      channelId: '',
      startTime: new Date().getTime(),
      pageNum: 1,
      pageSize: 10,
      excludeContIds: [],
      listRecommendIds: []
    }
  ) {
    const cache = await this.redisService.get(`pengpai/${payload.channelId}`)
    if (cache) return cache

    const url = `https://api.thepaper.cn/contentapi/nodeCont/getByChannelId`
    const userAgent = genUserAgent('mobile')
    const response = await this.post<PengpaiChannelResponse>(url, payload, {
      'user-agent': userAgent
    })

    const data = this.transformData(response.data.data.list)

    await this.redisService.set(`pengpai/${payload.channelId}`, data)

    return data
  }
  //#endregion

  public transformData(data: Item[]) {
    return data.map((item) => {
      return {
        title: item.name,
        thumbnail: item.smallPic,
        metrics: [item.nodeInfo.name, item.pubTime, item.interactionNum],
        ...item
      }
    })
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

  public async post<T>(url: string, data: any, headers: {} = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .post<T>(url, data, {
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
