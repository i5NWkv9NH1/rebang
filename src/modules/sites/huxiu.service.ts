import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { genUserAgent } from 'src/helpers'
import { stringify } from 'querystring'
import { HuxiuPaginationResponse, HuxiuTimelineResponse } from 'src/types'
import { RedisService } from 'src/shared/redis.service'

// TODO
@Injectable()
export class HuxiuService {
  private logger = new Logger(HuxiuService.name)

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //#region 最新
  public async latest() {
    const cache = await this.redisService.get('huxiu/latest')
    if (cache) return cache

    const url = `https://api-article.huxiu.com/web/article/articleList`
    const userAgent = genUserAgent('desktop')
    const headers = {
      Origin: 'https://www.huxiu.com',
      Referer: 'https://www.huxiu.com/',
      Cookie: 'huxiu_analyzer_wcy_id=5kgdmdjuja66xqa4i1t',
      'User-Agent': userAgent
    }
    const currentTimestamp = Math.ceil(new Date().getTime() / 1000)
    const pageSize = 22

    const params = {
      platform: 'www',
      recommend_time: `${currentTimestamp}`,
      pageSize: `${pageSize}`
    }

    const response = await this.get<HuxiuPaginationResponse>(
      url,
      params,
      headers
    )
    const list = response.data.data.dataList
      .map((item) => {
        return {
          ...item,
          subtitle: item.summary,
          date: item.formatDate,
          author: {
            id: item.user_info.uid,
            name: item.user_info.username,
            avatarUrl: item.user_info.avatar
          }
        }
      })
      .filter((item) => item.sponsor_name !== '广告')
    const meta = {
      currentPage: response.data.data.cur_page,
      pageSize: response.data.data.pagesize,
      hasNextPage: response.data.data.is_have_next_page,
      totalPage: response.data.data.total,
      totalPageSize: response.data.data.total_page,
      lastFetchTimestamp: response.data.data.last_dateline
    }
    const data = { list, meta }

    await this.redisService.set('huxiu/latest', data)

    return data
  }
  //#endregion

  //#region 频道
  //TODO
  //? 107
  //? 102
  public async channel() {
    return {}
  }
  //#endregion

  //#region 7x24
  public async timeline() {
    const cache = await this.redisService.get('huxiu/timeline')
    if (cache) return cache

    const url = `https://moment-api.huxiu.com/web-v2/moment/feed`
    const userAgent = genUserAgent('desktop')
    const headers = {
      Origin: 'https://www.huxiu.com',
      Referer: 'https://www.huxiu.com/',
      Cookie: 'huxiu_analyzer_wcy_id=5kgdmdjuja66xqa4i1t',
      'User-Agent': userAgent
    }
    const currentTimestamp = Math.ceil(new Date().getTime() / 1000)
    const pageSize = 22

    const params = {
      platform: 'www',
      last_dateline: '',
      is_ai: 0
    }

    const response = await this.get<HuxiuTimelineResponse>(url, params, headers)
    const data = {
      list: response.data.data.moment_list.datalist,
      meta: {
        currentPage: response.data.data.moment_list.cur_page,
        pageSize: response.data.data.moment_list.pagesize,
        totalPageSize: response.data.data.moment_list.total,
        totalPage: response.data.data.moment_list.total_page,
        lastFetchTimestamp: response.data.data.moment_list.last_dateline
      }
    }

    await this.redisService.set('huxiu/timeline', data)

    return data
  }
  //#endregion

  //#region 号外
  public async event() {
    const cache = await this.redisService.get('huxiu/event')
    if (cache) return cache

    const url = `https://api-ms-event.huxiu.com/v1/eventList`
    const userAgent = genUserAgent('desktop')
    const headers = {
      Origin: 'https://www.huxiu.com',
      Referer: 'https://www.huxiu.com/',
      Cookie: 'huxiu_analyzer_wcy_id=5kgdmdjuja66xqa4i1t',
      'User-Agent': userAgent
    }
    const currentTimestamp = Math.ceil(new Date().getTime() / 1000)
    const pageSize = 22

    const params = {
      platform: 'www',
      pageSize: `${pageSize}`
    }

    const response = await this.get<HuxiuPaginationResponse>(
      url,
      params,
      headers
    )
    const list = response.data.data.datalist
      .map((item) => {
        return {
          ...item,
          id: item.event_id,
          title: item.name,
          subtitle: item.introduce,
          date: item.show_time,
          thumbnail: item.cover_path,
          metric: item.join_person_num
        }
      })
      .filter((item) => item.sponsor_name !== '广告')
    const meta = {
      currentPage: response.data.data.cur_page,
      pageSize: response.data.data.pagesize,
      totalPage: response.data.data.total,
      totalPageSize: response.data.data.total_page
    }
    const data = { list, meta }

    await this.redisService.set('huxiu/event', data)

    return data
  }
  //#endregion

  public async post<T>(url: string, data: any, headers: {} = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService.post<T>(url, data, { headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data)
          throw 'An error happened!'
        })
      )
    )
    return response
  }

  public async get<T>(url: string, params: {} = {}, headers: {} = {}) {
    this.logger.log(`Http Request: ${url}`)
    const response = await firstValueFrom(
      this.httpService.get<T>(url, { params, headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data)
          throw 'An error happened!'
        })
      )
    )
    return response
  }
}
