import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'
import { AcfunRankRequestPayload, AcfunRankResponse } from 'src/types'
import { genUserAgent } from 'src/helpers'

@Injectable()
export class AcfunService {
  private logger = new Logger(AcfunService.name)

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  public async rankToday() {
    const cache = await this.redisService.get('acfun/today')
    if (cache) return cache

    const url = `https://www.acfun.cn/rest/pc-direct/rank/channel`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const payload: AcfunRankRequestPayload = {
      channelId: '',
      subChannelId: '',
      rankLimit: 30,
      rankPeriod: 'DAY'
    }
    const response = await this.get<AcfunRankResponse>(url, payload, headers)
    const data = response.data.rankList.map((item) => {
      const author = {
        name: item.userName,
        avatarUrl: item.user.headUrl
      }
      const subtitle = item.description
      return { author, subtitle, ...item }
    })

    await this.redisService.set('acfun/today', data)

    return data
  }

  public async rankThreeDays() {
    const cache = await this.redisService.get('acfun/threedays')
    if (cache) return cache

    const url = `https://www.acfun.cn/rest/pc-direct/rank/channel`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const payload: AcfunRankRequestPayload = {
      channelId: '',
      subChannelId: '',
      rankLimit: 30,
      rankPeriod: 'THREE_DAYS'
    }
    const response = await this.get<AcfunRankResponse>(url, payload, headers)
    const data = response.data.rankList.map((item) => {
      const author = {
        name: item.userName,
        avatarUrl: item.user.headUrl
      }
      const subtitle = item.description
      return { author, subtitle, ...item }
    })

    await this.redisService.set('acfun/threedays', data)

    return data
  }

  public async rankWeek() {
    const cache = await this.redisService.get('acfun/week')
    if (cache) return cache

    const url = `https://www.acfun.cn/rest/pc-direct/rank/channel`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const payload: AcfunRankRequestPayload = {
      channelId: '',
      subChannelId: '',
      rankLimit: 30,
      rankPeriod: 'WEEK'
    }
    const response = await this.get<AcfunRankResponse>(url, payload, headers)
    const data = response.data.rankList.map((item) => {
      const author = {
        name: item.userName,
        avatarUrl: item.user.headUrl
      }
      const subtitle = item.description
      return { author, subtitle, ...item }
    })

    await this.redisService.set('acfun/week', data)

    return data
  }

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
            throw 'An error happened!'
          })
        )
    )
    return response
  }
}
