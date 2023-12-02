import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RedisService } from 'src/shared/redis.service'
import { Repository } from 'typeorm'
import { genUserAgent, zhStringtoNum } from 'src/helpers'
import { FetchService } from 'src/shared/fetch.service'
import * as cheerio from 'cheerio'
import { ZhihuDailyEntity } from './zhihu-daily.entity'
import {
  OriginZhihuDailyContentResponse,
  OriginZhihuDailyItem,
  OriginZhihuDailyLatestResponse,
  ZhihuDailyItem
} from './zhihu-daily.type'

@Injectable()
export class ZhihuDailyService {
  private readonly logger = new Logger(ZhihuDailyService.name)

  public headers = {
    'User-Agent': genUserAgent('mobile')
  }

  constructor(
    @InjectRepository(ZhihuDailyEntity)
    private readonly repo: Repository<ZhihuDailyEntity>,
    private readonly redisService: RedisService,
    private readonly fetchService: FetchService
  ) {}

  public async fetchLatest() {
    const url = `https://news-at.zhihu.com/api/4/news/latest`
    const response =
      await this.fetchService.get<OriginZhihuDailyLatestResponse>(url, {
        headers: this.headers
      })
    const data = this.transformField(response.data.stories)

    return data
  }

  public async fetchByDate(date: string) {
    const url = `https://news-at.zhihu.com/api/4/news/before/${date}`
    const response =
      await this.fetchService.get<OriginZhihuDailyLatestResponse>(url, {
        headers: this.headers
      })

    const data = this.transformField(response.data.stories)

    return data
  }

  public async fetchContentById(newsId: string) {
    // const url = `https://news-at.zhihu.com/api/5/news/${newsId}`
    // const response =
    //   await this.fetchService.get<OriginZhihuDailyContentResponse>(url, {
    //     headers: this.headers
    //   })
    // const thumbnail = response.data.image
    // const id = response.data.id
    // const $ = cheerio.load(response.data.body)
    // const daily = {
    //   title: response.data.title,
    //   //? 日报详情页
    //   url: response.data.url
    // }
    // const question = {
    //   //? 问题详情页
    //   url: $('.view-more a').attr('href'),
    //   title: $('.question-title').text()
    // }
    // const answer = {
    //   id,
    //   content: $('.content').html(),
    //   author: {
    //     name: $('.meta .author').text(),
    //     avatarUrl: $('.meta .avatar').attr('src'),
    //     link: $('.meta a').attr('href')
    //   }
    // }
    // const data = {
    //   thumbnail,
    //   daily,
    //   question,
    //   answer
    // }
    // return data
  }

  public transformField(items: OriginZhihuDailyItem[]): ZhihuDailyItem[] {
    return items.map((item) => {
      let name = ''
      let authorFields: string[] = []
      if (item.hint.includes('/')) {
        authorFields = item.hint.split('/')
        name = authorFields[authorFields.length - 1].trim()
      } else {
        authorFields = item.hint.split('·')
        name = authorFields[0].trim()
      }
      return {
        id: item.id,
        title: item.title || '',
        caption: '',
        originUrl: item.url,
        thumbnailUrl: item.image || item.images[0] || '',
        author: {
          name
        }
      }
    })
  }
}
