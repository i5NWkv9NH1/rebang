import { Injectable, Logger } from '@nestjs/common'
import { genUserAgent } from 'src/helpers'
import * as cheerio from 'cheerio'
import { FetchService } from 'src/shared/fetch.service'
import { JIANDAN_API } from './jiandan.constant'
import { RedisService } from 'src/shared/redis.service'

@Injectable()
export class JiandanService {
  private readonly logger = new Logger(JiandanService.name)
  private readonly headers = {
    'User-Agent': genUserAgent('desktop')
  }

  constructor(
    private readonly fetchService: FetchService,
    private readonly redisService: RedisService
  ) {}

  //#region 4小时热门
  public async _4h() {
    const cache = await this.redisService.get('jiandan/4h')
    if (cache) return cache

    const url = JIANDAN_API._4H
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    return data
  }
  //#endregion

  //#region 3日最佳
  public async _3d() {
    const url = JIANDAN_API._3D
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    return data
  }
  //#endregion

  //#region 7日最佳
  public async _7d() {
    const url = JIANDAN_API._7D
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/7days', data)
    return data
  }
  //#endregion

  //#region 吐槽
  public async tucao() {
    const url = JIANDAN_API.TUCAO
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/tucao', data)
    return data
  }
  //#endregion

  //#region 无聊图
  public async top() {
    const url = JIANDAN_API.TOP
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/top', data)
    return data
  }
  //#endregion

  //#region 随手拍
  public async ooxx() {
    const url = JIANDAN_API.OOXX
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/ooxx', data)
    return data
  }
  //#endregion

  //#region 树洞
  public async comments() {
    const url = JIANDAN_API.COMMENTS
    const response = await this.fetchService.get<string>(url, {
      headers: this.headers
    })
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/ooxx', data)
    return data
  }
  //#endregion

  public crawler(html: string) {
    const $ = cheerio.load(html)
    const data = $('.commentlist li')
      .map((_, el) => {
        const id = $(el)
          .find('.text')
          .find('.righttext')
          .find('a')
          .text()
          .trim()
        const url =
          'https://jandan.net' +
          $(el).find('.text').find('.righttext').find('a').attr('href').trim()
        const author = $(el).find('.author').find('strong').text().trim()
        const date = $(el).find('.author').find('small').text().trim()
        const category = $(el).find('.text').find('b').text().trim()
        //TODO: text / image / images
        const content = $(el).find('.text').find('p').html().trim()
        const stats = {
          like:
            $(el).find('.jandan-vote').find('span').first().text().trim() || 0,
          unlike:
            $(el).find('.jandan-vote').find('span').last().text().trim() || 0,
          tucao: $(el).find('.jiandan-vote').find('a').last().text().trim() || 0
        }

        let hotTucaoList = []
        const hotTucaoEl = $(el).find('.tucao-hot')

        if (hotTucaoEl.length) {
          $(hotTucaoEl)
            .find('.tucao-row')
            .each((index, el) => {
              const item = {
                author: {
                  name: $(el).find('.tucao-author').find('span').text().trim(),
                  id: $(el).find('.tucao-author').find('a').attr('name').trim()
                },
                content: $(el).find('.tucao-content').text().trim()
              }
              hotTucaoList.push(item)
            })

          return {
            id,
            url,
            author,
            date,
            category,
            content,
            hotTucaoList,
            stats
          }
        }
        return { id, url, author, date, category, content, stats }
      })
      .toArray()

    return data
  }
}
