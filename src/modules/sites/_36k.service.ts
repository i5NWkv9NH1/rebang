import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'
import {
  KrPaginationItem,
  KrPaginationRequestPayload,
  KrRankHotResponse,
  KrRankItem,
  KrRankRequestPayload,
  KrRankVideoResponse
} from 'src/types/kr.type'
import { genUserAgent } from 'src/helpers'

@Injectable()
export class _36KService {
  private logger = new Logger(_36KService.name)

  private tags: [
    //? 48小时热榜
    { path: '/rank'; name: '热榜' },
    //? 最新
    { path: '/latest'; name: '资讯' },
    //? 一整天
    { path: '/today'; name: '快讯' }
  ]

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //#region 热榜 - 人气榜
  //? 每5分钟更新
  public async rankHot(
    payload: KrRankRequestPayload = {
      partner_id: 'wap',
      param: {
        siteId: 1,
        platformId: 2
      },
      timestamp: new Date().getTime()
    }
  ) {
    const cache = await this.redisService.get('36k/rank/hot')
    if (cache) return cache

    const url = `https://gateway.36kr.com/api/mis/nav/home/nav/rank/hot`
    const headers = { 'user-agent': genUserAgent('mobile') }
    const response = await this.post<KrRankHotResponse>(url, payload, headers)
    const data = this.transformRankDat(response.data.data.hotRankList)

    await this.redisService.set('36k/rank/hot', data)
    return data
  }
  //#endregion

  //#region 热榜 - 视频榜
  public async rankVideo(
    payload: KrRankRequestPayload = {
      partner_id: 'wap',
      param: {
        siteId: 1,
        platformId: 2
      },
      timestamp: new Date().getTime()
    }
  ) {
    const cache = await this.redisService.get('36k/rank/video')
    if (cache) return cache

    const url = `https://gateway.36kr.com/api/mis/nav/home/nav/rank/video`
    const headers = { 'user-agent': genUserAgent('mobile') }
    const response = await this.post<KrRankVideoResponse>(url, payload, headers)
    const data = this.transformRankDat(response.data.data.videoList)

    await this.redisService.set('36k/rank/video', data)
    return data
  }
  //#endregion

  //#region 热榜 - 热议榜
  public async rankComment(payload?: KrRankRequestPayload) {
    const url = `https://gateway.36kr.com/api/mis/nav/home/nav/rank/comment`
  }
  //#endregion

  //#region 热榜 - 收藏榜
  public async rankCollect(payload?: KrRankRequestPayload) {
    const url = `https://gateway.36kr.com/api/mis/nav/home/nav/rank/collect`
  }
  //#endregion

  //#region 最新资讯
  public async latest() {
    //* 先访问网页获取<script>数据
    //* 获取第一个 Callback
    //* 使用wap地址，获取 initialState
    //* 30条
    const getpageCallback = `https://www.36kr.com/information/web_news/`
    //? 将第一个 Callback 传入，此后每次使用分页都用接口返回的callback
    //*pc
    const pagniationUrl = `https://gateway.36kr.com/api/mis/nav/home/flow/forWap`
    //* wap
    // const pagniationUrl = `https://gateway.36kr.com/api/mis/nav/ifm/subNav/flow`

    const cache = await this.redisService.get('36k/latest')
    if (cache) {
      return cache
    }
    const userAgent = genUserAgent('mobile')
    const headers = { 'user-agent': userAgent }

    let scripts = []
    const response = await this.get<string>(getpageCallback, headers)
    const $ = cheerio.load(response.data, { xmlMode: false })
    $('script').each((_, el) => {
      scripts.push($(el).text())
    })

    scripts = scripts.filter((item) => item)
    //? select the last script body
    const selectedScript = scripts[scripts.length - 1] as string
    const parse = JSON.parse(selectedScript.replace('window.initialState=', ''))
    const pageCallback = parse.home.flow.pageCallback
    const hasNextPage = parse.home.flow.flowhasNextPage
    const items = this.transformPaginateData(parse.home.flow.itemList)

    return {
      pageCallback,
      hasNextPage,
      items
    }
  }

  //#endregion

  //#region 一整天快讯
  //? 自定义格式化数据
  public async today(
    /**
 * {
  "partner_id": "wap",
  "timestamp": 1700726975025,
  "param": {
    "pageSize": 20,
    "pageEvent": 1,
    "pageCallback": "eyJmaXJzdElkIjoyNTMwMjcxMDg5MTI0ODY5LCJsYXN0SWQiOjI1MzAxODA5Mzc1NDEzODAsImZpcnN0Q3JlYXRlVGltZSI6MTcwMDcwNzQ5MTI3OSwibGFzdENyZWF0ZVRpbWUiOjE3MDA3MDE5ODg4NjN9",
    "siteId": 1,
    "platformId": 2
  }
}
 */
    payload?: KrPaginationRequestPayload
  ) {
    const getpageCallback = `https://www.36kr.com/newsflashes/`
    //? 将第一个 Callback 传入，此后每次使用分页都用接口返回的callback
    //* wap
    const pagniationUrl = `https://gateway.36kr.com/api/mis/nav/newsflash/flow`
    //* pc
    // const pagniationUrl = `https://gateway.36kr.com/api/mis/nav/newsflash/list`

    const headers = { 'user-agent': genUserAgent('mobile') }
    const response = await this.post(pagniationUrl, payload, headers)
    console.log(response.data)
    return response.data
  }

  public async todayByPageCallback(pageCallback: string) {
    const payload = {}
    //? wap端接口
    const pagniationUrl = `https://gateway.36kr.com/api/mis/nav/newsflash/flow`
    const headers = { 'user-agent': genUserAgent('mobile') }
    const response = await this.post(pagniationUrl, payload, headers)
    console.log(response.data)
    return response.data
  }
  //#endregion

  public transformRankDat(items: KrRankItem[]) {
    return items
      .map((item) => {
        const title = item.templateMaterial.widgetTitle
        const thumbnail = item.templateMaterial.widgetImage
        const url = 'https://36kr.com/p/' + item.itemId
        const time = item.templateMaterial.publishTime
        const author = item.templateMaterial.authorName
        const stats = {
          collect: item.templateMaterial.statCollect,
          comment: item.templateMaterial.statComment,
          format: item.templateMaterial.statFormat,
          like: item.templateMaterial.statPraise,
          read: item.templateMaterial.statRead
        }

        return {
          title,
          thumbnail,
          author,
          time,
          url,
          stats,
          ...item
        }
      })
      .filter((item) => item)
  }

  public transformPaginateData(items: KrPaginationItem[]) {
    return items
      .map((item) => {
        const title = item.templateMaterial.widgetTitle
        const thumbnail = item.templateMaterial.widgetImage
        const url = 'https://36kr.com/p/' + item.itemId
        const author = item.templateMaterial.authorName
        const time = item.templateMaterial.publishTime
        const theme = item.templateMaterial.navName
        return {
          title,
          author,
          time,
          thumbnail,
          url,
          theme,
          ...item
        }
      })
      .filter((item) => item.title)
  }

  public async post<T>(url: string, payload: any, headers: {} = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService
        .post<T>(url, payload, {
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
