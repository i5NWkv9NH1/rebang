import { HttpException, Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import * as cheerio from 'cheerio'
import { FetchService } from 'src/shared/fetch.service'
import {
  WEIBO_API,
  WEIBO_CACHE_KEY,
  WEIBO_COOKIE_DOMAIN
} from './weibo.constant'
import { stringify } from 'querystring'
import {
  GetVerifyCodeDto,
  LoginDto,
  OriginWeiboEntrankResponse,
  OriginWeiboHotSearchResponse,
  OriginWeiboLoginResponse,
  OriginWeiboNewsResponse,
  OriginWeiboTopicPayload,
  OriginWeiboTopicResponse,
  WeiboEntrankItem,
  WeiboHotSearchItem,
  WeiboNewsItem,
  WeiboTopicItem
} from './weibo.type'
import { RedisService } from 'src/shared/redis.service'
import { HttpStatusCode } from 'axios'

//TODO: fix cralwer url
@Injectable()
export class WeiboService {
  private readonly logger = new Logger(WeiboService.name)
  private readonly baseUrl = `https://s.weibo.com/weibo`
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }
  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  //#region 获取验证码
  public async getVerifyCode(verifyCodeDto: GetVerifyCodeDto) {
    const cache = await this.redisService.get(WEIBO_CACHE_KEY.VERIFY_CODE)
    if (cache) return cache

    const payload = stringify({
      phone: verifyCodeDto.phone
    })

    const response = await this.fetchService.post<any>(
      WEIBO_API.VERIFY_CODE,
      payload,
      {
        headers: this.headers
      }
    )

    if (!response.data.sendsms) {
      throw new HttpException(
        `获取验证码失败，请查看日志`,
        HttpStatusCode.BadRequest
      )
    }
    const data = {
      message: response.data.msg,
      sendsms: response.data.sendsms
    }
    await this.redisService.set(WEIBO_CACHE_KEY.VERIFY_CODE, data)

    return data
  }
  //#endregion

  //#region 登录
  public async login(loginDto: LoginDto) {
    const cache = await this.redisService.get(WEIBO_CACHE_KEY.LOGIN)
    if (cache) return cache

    const { phone, smscode, getuser, getcookie, getoauth } = loginDto
    const payload = stringify({
      phone,
      smscode,
      getuser,
      getcookie,
      getoauth
    })

    const response = await this.fetchService.post<OriginWeiboLoginResponse>(
      WEIBO_API.LOGIN,
      payload,
      {
        headers: this.headers
      }
    )

    const status = response.data.status
    //? status = 1
    if (!!!status) {
      throw new HttpException(`登录失败，请查看日志`, HttpStatusCode.BadRequest)
    }

    const weiboCookies = response.data.cookie.cookie[WEIBO_COOKIE_DOMAIN]
    const cookie = weiboCookies
      .split('\n')
      .map((cookie) => cookie.split(';')[0])
      .toString()
      .replaceAll(',', ';')

    const data = {
      cookie,
      user: { ...response.data }
    }

    await this.redisService.set(WEIBO_CACHE_KEY.LOGIN, data, 259200)
    await this.redisService.set(WEIBO_CACHE_KEY.COOKIE, cookie, 259200)

    return data
  }
  //#endregion

  //#region 获取Cookie
  public async getCookie() {
    return await this.redisService.get(WEIBO_CACHE_KEY.COOKIE)
  }
  //#endregion

  //#region  热搜
  public async hotsearch() {
    const cookie = await this.redisService.get(WEIBO_CACHE_KEY.COOKIE)
    const response = await this.fetchService.get<OriginWeiboHotSearchResponse>(
      WEIBO_API.HOT_SEARCH,
      {
        headers: { ...this.headers, Cookie: cookie }
      }
    )

    const items: WeiboHotSearchItem[] = response.data.data.realtime
      .filter((item) => item.is_ad !== 1)
      .map((item) => {
        const rank = item.rank
        const title = item.note
        const thumbnailUrl = ''
        const originUrl = encodeURI(`${this.baseUrl}?q=${item.note}`)
        const publishedDate = item.onboard_time

        const status = {
          gov: item.is_gov,
          hot: item.is_hot,
          new: item.is_new,
          fei: item.is_fei
        }
        const stats = {
          hot: item.num || item.raw_hot,
          tag: item.category
        }

        return {
          rank,
          title,
          thumbnailUrl,
          originUrl,
          status,
          stats,
          publishedDate
        }
      })

    return items
  }
  //#endregion

  //#region  要闻 新时代
  public async socialevent() {
    const cookie = await this.redisService.get(WEIBO_CACHE_KEY.COOKIE)

    const response = await this.fetchService.get<OriginWeiboNewsResponse>(
      WEIBO_API.NEWS,
      {
        headers: { ...this.headers, Cookie: cookie }
      }
    )

    const items: WeiboNewsItem[] = response.data.data.band_list.map((item) => {
      const rank = item.rank
      const title = item.topic
      const caption = item.summary
      const thumbnailUrl = item.images_url
      const originUrl = encodeURI(`${this.baseUrl}?q=${item.topic}`)
      const author = {
        name: item.claim.replace(/[0-9]/g, '').replace(/\_/, '')
      }
      const stats = {
        mention: item.mention,
        read: item.read,
        tag: item.category
      }

      return {
        rank,
        title,
        caption,
        thumbnailUrl,
        originUrl,
        author,
        stats
      }
    })

    return items
  }
  //#endregion

  //#region 文娱
  public async entrank() {
    const cookie = await this.redisService.get(WEIBO_CACHE_KEY.COOKIE)

    const response = await this.fetchService.get<OriginWeiboEntrankResponse>(
      WEIBO_API.ENTRANK,
      {
        headers: { ...this.headers, Cookie: cookie }
      }
    )

    const items: WeiboEntrankItem[] = response.data.data.band_list.map(
      (item) => {
        const title = item.note
        const thumbnailUrl = ''
        const originUrl = encodeURI(`${this.baseUrl}?q=${item.note}`)
        const publishedDate = item.onboard_time

        const status = {
          hot: item.is_hot,
          new: item.is_new,
          fei: item.is_fei
        }
        const stats = {
          hot: item.num || item.hot_num || item.circle_hot,
          tag: item.category
        }

        return {
          title,
          thumbnailUrl,
          originUrl,
          status,
          stats,
          publishedDate
        }
      }
    )

    return items
  }
  //#endregion

  //#region  话题
  public async topicband(page: number = 1, count: number = 10) {
    const cookie = await this.redisService.get(WEIBO_CACHE_KEY.COOKIE)

    const query = {
      sid: 'v_weibopro',
      category: 'all',
      page: 1,
      count: 10
    } as OriginWeiboTopicPayload

    const response = await this.fetchService.get<OriginWeiboTopicResponse>(
      WEIBO_API.TOPIC_BAND,
      {
        headers: {
          ...this.headers,
          Cookie: cookie
        },
        params: query
      }
    )

    const meta = {
      totalSize: response.data.data.total_data_num,
      totalPage: response.data.data.total_num
    }
    const items: WeiboTopicItem[] = response.data.data.statuses.map((item) => {
      const title = item.topic
      const originUrl = 'https://s.weibo.com/weibo?q=' + item.topic
      const images = item.mblog.pic_ids.filter((item) => item)
      const thumbnail = !!images.length
        ? 'tvax1.sinaimg.cn' + images[0]
        : item.images_url
      const caption = item.mblog.text
      const author = {
        name: item.claim.replace(/[0-9]/g, '').replace(/\_/, '')
      }
      const stats = {
        read: item.read,
        tag: item.category,
        comment: item.mention
      }
      const rank = item.rank
      return {
        rank,
        title,
        originUrl,
        thumbnail,
        caption,
        author,
        stats
      }
    })

    const data = {
      items,
      meta
    }

    return data
  }
  //#endregion
}
