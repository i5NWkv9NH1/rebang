import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError, AxiosProxyConfig } from 'axios'
import { genUserAgent } from 'src/helpers'
import { RedisService } from 'src/shared/redis.service'
import { ZhihuDailyContentResponse, ZhihuDailyLatestResponse } from 'src/types'

@Injectable()
export class ZhihuDailyService {
  private logger = new Logger(ZhihuDailyService.name)

  constructor(
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  public async latest() {
    const cache = await this.redisService.get('zhihu-daily/latest')
    if (cache) return cache

    const url = `https://news-at.zhihu.com/api/4/news/latest`
    const userAgent = genUserAgent('desktop')
    const response = await this.get<ZhihuDailyLatestResponse>(url, {
      'user-agent': userAgent
    })
    const data = this.transformFields(response.data.stories)

    await this.redisService.set('zhihu-daily/latest', data)
    return data
  }

  public async findContentById(newsId: string) {
    const url = `https://news-at.zhihu.com/api/5/news/${newsId}`
    const userAgent = genUserAgent('desktop')
    const response = await this.get<ZhihuDailyContentResponse>(url, {
      'user-agent': userAgent
    })
    const thumbnail = response.data.image
    const id = response.data.id
    const $ = cheerio.load(response.data.body)
    const daily = {
      title: response.data.title,
      //? 日报详情页
      url: response.data.url
    }
    const question = {
      //? 问题详情页
      url: $('.view-more a').attr('href'),
      title: $('.question-title').text()
    }
    const answer = {
      id,
      content: $('.content').html(),
      author: {
        name: $('.meta .author').text(),
        avatarUrl: $('.meta .avatar').attr('src'),
        link: $('.meta a').attr('href')
      }
    }
    return {
      thumbnail,
      daily,
      question,
      answer
    }
  }

  public async findByDate(date: string) {
    const url = `https://news-at.zhihu.com/api/4/news/before/${date}`
    const userAgent = genUserAgent('desktop')
    const response = await this.get<ZhihuDailyLatestResponse>(url, {
      'user-agent': userAgent
    })
    const data = this.transformFields(response.data.stories)
    return data
  }

  /**
   *
    "image_hue": "0x423024",
    "hint": "作者 / 汤川",
    "url": "https://daily.zhihu.com/story/9767285",
    "image": "https://picx.zhimg.com/v2-f7a2b3cdae3505d8fcdbdf8d95acf20a.jpg?source=8673f162",
    "title": "化学中，杂质为什么不能被除尽？",
    "ga_prefix": "111507",
    "type": 0,
    "id": 9767285
   */
  public transformFields(data: any) {
    return data.map((item) => {
      const thumbnail = item.images
      let name: string = ''
      let authorFields: string[] = []
      if (item.hint.includes('/')) {
        authorFields = item.hint.split('/')
        name = authorFields[authorFields.length - 1].trim()
      } else {
        authorFields = item.hint.split('·')
        name = authorFields[0].trim()
      }
      const author = {
        name
      }

      return {
        ...item,
        thumbnail,
        author
      }
    })
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
