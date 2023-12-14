import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RedisService } from 'src/shared/redis.service'
import { ZhihuEntity } from './zhihu.entity'
import { Repository } from 'typeorm'
import { genUserAgent, zhStringtoNum } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import * as cheerio from 'cheerio'
import {
  OriginZhihuHotResponse,
  OriginZhihuWebResponse,
  SetCookieDto,
  ZhihuItem
} from './zhihu.type'
import { ZHIHU_API, ZHIHU_CACHE_KEY } from './zhihu.constant'

@Injectable()
export class ZhihuService {
  private readonly logger = new Logger(ZhihuService.name)

  public headers = {
    'User-Agent': genUserAgent('desktop'),
    'Sec-Ch-Ua-Platform:': 'Windows',
    'X-Api-Version': '3.0.76',
    Cookie: ''
  }

  constructor(
    @InjectRepository(ZhihuEntity)
    private readonly repo: Repository<ZhihuEntity>,
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  //#region not use cookie
  public async billboard() {
    const cache = await this.redisService.get(ZHIHU_CACHE_KEY.BILLBOARD)
    if (cache) return cache

    const url = `https://www.zhihu.com/billboard`

    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })

    const $ = cheerio.load(response.data, { xmlMode: false })
    let items: ZhihuItem[] = []
    $('script').each((_, el) => {
      const id = $(el).attr('id')
      if (id === 'js-initialData') {
        const json = JSON.parse($(el).text()) as OriginZhihuWebResponse
        const parsedJSON = json['initialState']['topstory']['hotList']
        items = parsedJSON.map((item) => {
          return {
            id: item.id || item.cardId,
            title: item.target.titleArea.text,
            caption: item.target.excerptArea.text,
            thumbnailUrl: item.target.imageArea.url,
            originUrl: item.target.link.url,
            stats: {
              hot: zhStringtoNum(item.target.metricsArea.text),
              answer: item.feedSpecific.answerCount
            }
          }
        })
      }
    })

    await this.redisService.set(ZHIHU_CACHE_KEY.BILLBOARD, { items })

    return { items }
  }
  //#endregion

  //#region auth
  public async getCookie() {
    const cache = await this.redisService.get(ZHIHU_CACHE_KEY.COOKIE)
    if (cache) {
      this.headers.Cookie = cache
      return this.headers
    }
  }

  public async setCookie(setCookieDto: SetCookieDto) {
    await this.redisService.set(ZHIHU_CACHE_KEY.COOKIE, setCookieDto.cookie)
    this.headers.Cookie = setCookieDto.cookie
    return this.headers
  }

  public async hot(limit: number = 50, desktop: boolean = true) {
    const cache = await this.redisService.get(ZHIHU_CACHE_KEY.HOT)
    if (cache) return cache

    const response = await this.fetchService.get<OriginZhihuHotResponse>(
      ZHIHU_API.HOT,
      {
        headers: {
          ...this.headers,
          Referer: 'https://www.zhihu.com/hot'
        },
        params: { limit, desktop }
      }
    )

    const items = response.data.data.map((item) => {
      // const title = item.target.title_area.text
      // const caption = item.target.excerpt_area.text
      // const originUrl = item.target.link.url
      // const thumbnailUrl = item.target.image_area.url
      // const stats = {
      //   hot: item.target.metrics_area.text,
      //   answer: item.feed_specific.answer_count
      // }

      // return { title, caption, originUrl, thumbnailUrl, stats }
      console.log(item.target)
    })

    await this.redisService.set(ZHIHU_CACHE_KEY.HOT, items)
    return items
  }

  public async me() {
    const response = await this.fetchService.get(ZHIHU_API.ME, {
      headers: {
        ...this.headers
      }
    })

    const data = response.data
    await this.redisService.set(ZHIHU_CACHE_KEY.ME, data)

    return data
  }

  //#endregion
}
