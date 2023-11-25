import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { InjectBrowser } from 'nestjs-playwright'
import { Browser } from 'playwright'
import * as cheerio from 'cheerio'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'
import { RedisService } from 'src/shared/redis.service'
import { genUserAgent } from 'src/helpers'

@Injectable()
export class JiandanService {
  private logger = new Logger(JiandanService.name)

  constructor(
    @InjectBrowser() private readonly browser: Browser,
    private readonly redisService: RedisService,
    private httpService: HttpService
  ) {}

  //? 4小时热门
  public async _4h() {
    const cache = await this.redisService.get('jiandan/4h')
    if (cache) return cache

    const url = `https://jandan.net/top-4h`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const response = await this.get<string>(url, headers)
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/4h', data)
    return data
  }

  //#region 3日最佳
  public async _3d() {
    const cache = await this.redisService.get('jiandan/3days')
    if (cache) return cache

    const url = `https://jandan.net/top-3days`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const response = await this.get<string>(url, headers)
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/3days', data)
    return data
  }
  //#endregion
  //#region 7日最佳
  public async _7d() {
    const cache = await this.redisService.get('jiandan/7days')
    if (cache) return cache

    const url = `https://jandan.net/top-7days`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const response = await this.get<string>(url, headers)
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/7days', data)
    return data
  }
  //#endregion
  //#region 吐槽
  public async tucao() {
    const cache = await this.redisService.get('jiandan/tucao')
    if (cache) return cache

    const url = `https://jandan.net/top-tucao`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const response = await this.get<string>(url, headers)
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/tucao', data)
    return data
  }
  //#endregion
  //#region 无聊图
  public async top() {
    const cache = await this.redisService.get('jiandan/top')
    if (cache) return cache

    const url = `https://jandan.net/top`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const response = await this.get<string>(url, headers)
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/top', data)
    return data
  }
  //#endregion
  //#region 随手拍
  public async ooxx() {
    const cache = await this.redisService.get('jiandan/ooxx')
    if (cache) return cache

    const url = `https://jandan.net/top-ooxx`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const response = await this.get<string>(url, headers)
    const $ = cheerio.load(response.data)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/ooxx', data)
    return data
  }
  //#endregion
  //#region 树洞
  public async comments() {
    const cache = await this.redisService.get('jiandan/comments')
    if (cache) return cache

    const url = `https://jandan.net/top-comments`
    const headers = { 'user-agent': genUserAgent('desktop') }
    const response = await this.get<string>(url, headers)

    const data = this.crawler(response.data)

    await this.redisService.set('jiandan/comments', data)
    return data
  }
  //#endregion

  //#region
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
  //#endregion

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
