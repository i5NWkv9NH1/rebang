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

  public readonly headers = {
    'User-Agent': genUserAgent('desktop'),
    // 'Sec-Ch-Ua-Platform:': 'Windows',
    'X-Api-Version': '3.0.76',
    Cookie: ''
  }

  constructor(
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  //#region not use cookie
  public async billboard() {
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

    return items
  }
  //#endregion

  //#region auth
  public async getCookie() {
    const cache = await this.redisService.get(ZHIHU_CACHE_KEY.COOKIE)
    return cache
  }

  public async setCookie(setCookieDto: SetCookieDto) {
    await this.redisService.set(
      ZHIHU_CACHE_KEY.COOKIE,
      setCookieDto.cookie,
      259200
    )
    this.headers.Cookie = setCookieDto.cookie
    return await this.getCookie()
  }

  public async rank(limit: number = 50, desktop: boolean = true) {
    const response = await this.fetchService.get<any>(ZHIHU_API.RANK, {
      headers: {
        ...this.headers,
        Referer: 'https://www.zhihu.com/hot'
      },
      params: { limit, desktop }
    })

    const items = response.data.data.map((item) => {
      const title = item.target.title_area.text
      const caption = item.target.excerpt_area.text
      const originUrl = item.target.link.url
      const thumbnailUrl = item.target.image_area.url
      const stats = {
        hot: item.target.metrics_area.text,
        answer: item.feed_specific.answer_count
      }

      return { title, caption, originUrl, thumbnailUrl, stats }
      // const id = item.id
      // const title = item.target.title
      // const caption = item.target.excerpt
      // const originUrl = 'https://www.zhihu.com/question/' + id
      // const thumbnailUrl = item.children[0].thumbnail || ''
      // const publishedDate = item.target.created
      // const stats = {
      //   hot: item.detail_text,
      //   answer: item.target.answer_count,
      //   follower: item.target.follower_count,
      //   comment: item.target.comment_count
      // }
      // const author = {
      //   id: item.target.author.id,
      //   name: item.target.author.name,
      //   avatarUrl: item.target.author.avatar_url
      // }

      // return {
      //   title,
      //   caption,
      //   originUrl,
      //   thumbnailUrl,
      //   publishedDate,
      //   author,
      //   stats
      // }
    })

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
