import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser, Cookie } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'
import { genUserAgent } from 'src/helpers'
import { DouyinRankHotResponse, DouyinRankResponse } from 'src/types'

@Injectable()
export class DouyinService {
  private logger = new Logger(DouyinService.name)
  private userAgent = genUserAgent('mobile')

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //TODO: use axios
  public async getCookie(): Promise<Cookie[]> {
    const cache = await this.redisService.get('tiktok/cookie')
    if (cache) return cache

    const url = `https://www.douyin.com/passport/general/login_guiding_strategy/?aid=6383`
    const ctx = await this.browser.newContext({
      userAgent: this.userAgent
    })
    const page = await ctx.newPage()
    await page.goto(url)
    await page.screenshot({
      path: 'screenshots/douyin.png'
    })
    const cookie = await ctx.cookies()

    await page.close()
    await ctx.close()
    await this.redisService.set('xueqiu/cookie', cookie)

    return cookie
  }

  //? 抖音热点榜
  public async hot() {
    const cache = await this.redisService.get('douyin/hot')
    if (cache) return cache

    const cookies = await this.getCookie()
    const parseCookie = cookies
      .map((item) => `${item.name}=${item.value}`)
      .toString()
      .replaceAll(',', ';')
    const headers = {
      Cookie: parseCookie,
      'User-Agent': this.userAgent
    }
    const url = `https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1&round_trip_time=50`
    const params = {
      device_platform: 'weapp',
      aid: 6383,
      channel: 'channel_pc_web',
      detail_list: 1,
      round_trip_time: 50
    }
    const response = await this.get<DouyinRankHotResponse>(url, headers)
    const data = response.data.data.word_list

    await this.redisService.set('douyin/hot', data)
    return data
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
