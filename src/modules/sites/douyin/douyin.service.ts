import { Injectable } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import { DOUYIN_API, DOUYIN_CACHE_KEY } from './douyin.constant'
import { DouyinItem, DouyinRankHotResponse } from './douyin.type'
import { RedisService } from 'src/shared/redis.service'
import { parseCookie } from 'src/helpers/cookie'

@Injectable()
export class DouyinService {
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  public async getCookie() {
    const cache = await this.redisService.get(DOUYIN_CACHE_KEY.COOKIE)
    if (cache) return cache

    const url = DOUYIN_API.COOKIE
    const COOKIE_NAME = 'passport'

    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })

    const cookies = response.headers['set-cookie'].filter((cookie) =>
      cookie.includes(COOKIE_NAME)
    )

    await this.redisService.set(DOUYIN_CACHE_KEY.COOKIE, cookies)
    return cookies
  }

  public async hot() {
    const url = DOUYIN_API.HOT
    const params = {
      device_platform: 'weapp',
      aid: 6383,
      channel: 'channel_pc_web',
      detail_list: 1,
      round_trip_time: 50
    }
    const cookies = parseCookie(await this.getCookie())
    const response = await this.fetchService.get<DouyinRankHotResponse>(url, {
      headers: {
        ...this.headers,
        Cookie: cookies
      },
      params
    })

    const items: DouyinItem[] = response.data.data.word_list.map((item) => {
      return {
        id: item.group_id,
        originUrl: 'https://www.douyin.com/video/' + item.group_id,
        title: item.word,
        publishedDate: +(item.event_time + '000'),
        thumbnailUrl: item.word_cover.url_list[0],
        thumbnails: item.word_cover,
        stats: {
          hot: item.hot_value
        }
      }
    })

    return items
  }
}
